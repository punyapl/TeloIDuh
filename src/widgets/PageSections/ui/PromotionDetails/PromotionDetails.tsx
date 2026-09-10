import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { PromotionItem } from "@/entities/Promotion/types";
import { getPromotionBySlug } from "@/entities/Promotion/api/promotion";
import { Loader } from "@/shared/ui/Loader";
import { PromotionArticleContent } from "@/entities/Promotion";
import { Helmet } from "react-helmet-async";

export const PromotionDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const [promo, setPromo] = useState<PromotionItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        getPromotionBySlug(slug)
            .then(setPromo)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [slug]);

    if (isLoading) {
        return <div className="w-full h-full flex justify-center items-center"><Loader /></div>
    } else if (!promo) {
        return <div className="w-full h-full flex justify-center items-center"><p className="font-p-md text-text-secondary">Статья не найдена</p></div>
    } else {
        return (
            <>
                <Helmet>
                    <title>{`${promo.title} | Акции | Тело и дух`}</title>
                    <meta name="description" content={promo.shortDescription} />
                    <meta name="keywords" content={`акции клиники, скидки, ${promo.title.toLowerCase()}, тело и дух`} />
                    <link rel="canonical" href={`https://teloiduh.ru/promo/${promo.slug}`} />
                </Helmet>
                <PromotionArticleContent article={promo} />
            </>
        );
    }
};
