import { Specialist } from "@/entities/Specialist/types";
import doctorPlaceholder from '@/shared/assets/images/doctorPlaceholder.jpg'
import { Section } from "@/shared/ui/Section"
import { SpecialistCard } from "@/widgets/SpecialistCard";
import { useEffect, useRef, useState, useCallback } from "react";
import { specialistApi } from "@/entities/Specialist";
import { getFormattedIndex } from "@/shared/lib/getFormattedIndex";
import { getStrapiMediaUrl } from "@/shared/lib/getStrapiMediaUrl/getStrapiMediaUrl";


export const SpecialistList = () => {
    const [specialists, setSpecialists] = useState<Specialist[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState("");

    const loadSpecialists = useCallback(async (currentSearch: string, offset: number, append: boolean) => {
        setIsLoading(true);
        try {
            const { data: newSpecialists, meta } = await specialistApi.getSpecialists(9, offset, currentSearch || undefined);
            setSpecialists((prev) => (append ? [...prev, ...newSpecialists] : newSpecialists));
            setHasMore(meta.pagination.hasMore);
        } catch (e) {
            console.error('Error loading specialists:', e);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLoadMore = () => {
        if (isLoading) return;
        loadSpecialists(search, specialists.length, true);
    };

    // первичная загрузка
    useEffect(() => {
        loadSpecialists("", 0, false);
    }, [loadSpecialists]);

    const showEmpty = !isLoading && specialists.length === 0;

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="specialist-list"
        >
            {showEmpty ? (
                <p className="font-p-md text-text-secondary text-center">
                    Ничего не найдено
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[30px] gap-y-[60px] max-md:gap-x-[16px] max-md:gap-y-[30px]">
                    {specialists.map((specialist, i) => (
                        <div className="flex items-center justify-center" key={specialist.id}>
                            <SpecialistCard
                                image={getStrapiMediaUrl(specialist.photo ?? undefined, doctorPlaceholder)}
                                specialty={specialist.specialties.map((s) => s.name).join(", ")}
                                name={specialist.fullName}
                                index={getFormattedIndex(i)}
                            />
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
