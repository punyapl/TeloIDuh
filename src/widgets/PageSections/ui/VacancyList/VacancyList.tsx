import { getVacancies } from "@/entities/Vacancy/api/vacancy";
import { VacancyItem } from "@/entities/Vacancy";
import { getFormattedIndex } from "@/shared/lib/getFormattedIndex";
import { SearchInput } from "@/shared/ui/SearchInput";
import { Section } from "@/shared/ui/Section";
import { VacancyCard } from "@/widgets/VacancyCard";
import { useCallback, useEffect, useRef, useState } from "react";

export const VacancyList = () => {
    const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState("");

    const loadVacancies = useCallback(async (currentSearch: string, offset: number, append: boolean) => {
        setIsLoading(true);
        try {
            const { data: newVacancies, meta } = await getVacancies(8, offset, currentSearch || undefined);
            setVacancies((prev) => (append ? [...prev, ...newVacancies] : newVacancies));
            setHasMore(meta.pagination.hasMore);
        } catch (e) {
            console.error('Error loading vacancies:', e);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLoadMore = () => {
        if (isLoading) return;
        loadVacancies(search, vacancies.length, true);
    };

    // первичная загрузка
    useEffect(() => {
        loadVacancies("", 0, false);
    }, [loadVacancies]);

    // дебаунс поиска
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const handleSearchChange = (value: string) => {
        setSearch(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            loadVacancies(value, 0, false);
        }, 400);
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const showEmpty = !isLoading && vacancies.length === 0;

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="vacancy-list"
        >
            <SearchInput
                className="self-start max-w-[468px]"
                placeholder="Поиск по вакансиям..."
                onChange={handleSearchChange}
            />

            {showEmpty ? (
                <p className="font-p-md text-text-secondary text-center">
                    Ничего не найдено
                </p>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-[60px] gap-x-[30px] max-md:gap-y-[16px] max-md:gap-x-[30px]">
                    {vacancies.map((card, i) => (
                        <div className="flex items-center justify-center" key={i}>
                            <VacancyCard index={getFormattedIndex(i)} {...card} />
                        </div>
                    ))}
                </div>
            )}

            {hasMore && (
                <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-8 py-3 rounded-xl border border-border text-text-secondary font-p-md hover:border-primary hover:text-primary-dark transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Загружаем...' : 'Показать ещё'}
                </button>
            )}
        </Section>
    );
};
