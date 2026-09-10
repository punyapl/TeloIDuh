import { Section } from "@/shared/ui/Section";
import { NewsCard } from "@/widgets/NewsCard";
import { ArticleItem } from "../../../Article";
import { useEffect, useState } from "react";
import { getLatestNewsArticles } from "../../api/news";

interface SuggestedNewsArticlesProps {
    excludeSlug?: string;
}

export const SuggestedNewsArticles = (props: SuggestedNewsArticlesProps) => {
    const { excludeSlug } = props
    const [isLoading, setIsLoading] = useState(true);

    const [articles, setArticles] = useState<ArticleItem[]>([]);

    useEffect(() => {
        getLatestNewsArticles(3, excludeSlug)
            .then(setArticles)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [excludeSlug])

    if (isLoading || !articles.length) return null;

    return (
        <Section
            SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[40px] max-md:gap-[20px]"
            role="region"
            aria-label="suggested-news-articles"
        >
            <h3 className="font-h3 text-heading uppercase">Читайте также</h3>
            <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-[30px]">
                {articles.map(article => (
                    <NewsCard key={article.id} newsInfo={article} />
                ))}
            </div>
        </Section>
    );
};
