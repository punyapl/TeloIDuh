import { NewsArticleContent, SuggestedNewsArticles } from "@/entities/News";
import { ArticleItem } from "@/entities/Article";
import { getNewsArticleBySlug } from "@/entities/News/api/news";
import { Loader } from "@/shared/ui/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";

export const NewsArticle = () => {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<ArticleItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        getNewsArticleBySlug(slug)
            .then(setArticle)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [slug])

    if (isLoading) {
        return <div className="w-full h-full flex justify-center items-center"><Loader /></div>
    } else if (!article) {
        return <div className="w-full h-full flex justify-center items-center"><p className="font-p-md text-text-secondary">Статья не найдена</p></div>
    } else {
        return (
            <>
                <Helmet>
                    <title>{`${article.title} | Тело и дух`}</title>
                    <meta name="description" content={article.shortDescription} />
                    <meta name="keywords" content={`${article.theme}, новости клиники, статьи о здоровье, тело и дух`} />
                    <link rel="canonical" href={`https://teloiduh.ru/news/${article.slug}`} />
                </Helmet>
                <NewsArticleContent article={article} />
                <SuggestedNewsArticles />
            </>
        )
    }
};
