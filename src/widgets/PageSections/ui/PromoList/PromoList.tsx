import { getPromotions } from "@/entities/Promotion/api/promotion";
import { PromotionItem } from "@/entities/Promotion";
import { getStrapiMediaUrl } from "@/shared/lib/getStrapiMediaUrl";
import { Button } from "@/shared/ui/Button";
import { SearchInput } from "@/shared/ui/SearchInput";
import { Section } from "@/shared/ui/Section";
import { PromoCard } from "@/widgets/PromoCard";
import { useCallback, useEffect, useRef, useState } from "react";

export const PromoList = () => {
    const [promotions, setPromotions] = useState<PromotionItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState("");

    const loadPromotions = useCallback(async (currentSearch: string, offset: number, append: boolean) => {
        setIsLoading(true);
        try {
            const { data: newPromotions, meta } = await getPromotions(8, offset, currentSearch || undefined);
            setPromotions((prev) => (append ? [...prev, ...newPromotions] : newPromotions));
            setHasMore(meta.pagination.hasMore);
        } catch (e) {
            console.error('Error loading promotions:', e);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLoadMore = () => {
        if (isLoading) return;
        loadPromotions(search, promotions.length, true);
    };

    // первичная загрузка
    useEffect(() => {
        loadPromotions("", 0, false);
    }, [loadPromotions]);

    // дебаунс поиска
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const handleSearchChange = (value: string) => {
        setSearch(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            loadPromotions(value, 0, false);
        }, 400);
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const showEmpty = !isLoading && promotions.length === 0;

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col items-center gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="promotion-list"
        >
            <SearchInput
                className="self-start max-w-[468px]"
                placeholder="Поиск по акциям..."
                onChange={handleSearchChange}
            />

            {showEmpty ? (
                <p className="font-p-md text-text-secondary text-center">
                    Ничего не найдено
                </p>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-[30px] gap-x-[60px] max-md:gap-y-[16px] max-md:gap-x-[30px] w-full">
                    {promotions.map((card) => (
                        <div className="flex items-center justify-center" key={card.slug}>  
                            <PromoCard {...card} image={getStrapiMediaUrl(card.image)} />
                        </div>
                    ))}
                </div>
            )}

            {hasMore && (
                <Button
                    theme="default"
                    text={isLoading ? 'Загружаем...' : 'Показать ещё'}
                    onClick={handleLoadMore}
                    disabled={isLoading}
                />
            )}
        </Section>
    );
};
