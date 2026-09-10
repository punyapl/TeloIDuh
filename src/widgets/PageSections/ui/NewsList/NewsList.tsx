import { ArticleItem } from "@/entities/Article";
import { getNews } from "@/entities/News/api/news";
import { SearchInput } from "@/shared/ui/SearchInput";
import { Section } from "@/shared/ui/Section";
import { NewsCard } from "@/widgets/NewsCard";
import { useCallback, useEffect, useRef, useState } from "react";

export const NewsList = () => {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState("");

    const loadNews = useCallback(async (currentSearch: string, offset: number, append: boolean) => {
        setIsLoading(true);
        try {
            const { data: newArticles, meta } = await getNews(8, offset, currentSearch || undefined);
            setArticles((prev) => (append ? [...prev, ...newArticles] : newArticles));
            setHasMore(meta.pagination.hasMore);
        } catch (e) {
            console.error("Error loading news:", e);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleLoadMore = () => {
        if (isLoading) return;
        loadNews(search, articles.length, true);
    };

    // первичная загрузка
    useEffect(() => {
        loadNews("", 0, false);
    }, [loadNews]);

    // дебаунс поиска
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const handleSearchChange = (value: string) => {
        setSearch(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            loadNews(value, 0, false);
        }, 400);
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const isSearching = search.trim().length > 0;
    const showEmpty = !isLoading && articles.length === 0;

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="news-list"
        >
            <SearchInput
                className="self-start max-w-[468px]"
                placeholder="Поиск статей..."
                onChange={handleSearchChange}
            />

            {showEmpty ? (
                <p className="font-p-md text-text-secondary text-center">
                    Ничего не найдено
                </p>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-[30px] gap-y-[60px] max-md:gap-x-[16px] max-md:gap-y-[30px]">
                    {articles.map((card) => (
                        <div key={card.id} className="flex items-center justify-center">
                            <NewsCard newsInfo={card} />
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
