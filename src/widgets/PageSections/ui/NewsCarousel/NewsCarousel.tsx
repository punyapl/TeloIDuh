import { ArticleItem } from "@/entities/Article";
import { getCarouselNews, } from "@/entities/News/api/news";
import { getCarouselPromotions } from "@/entities/Promotion/api/promotion";
import { PromotionItem } from "@/entities/Promotion/types/promotion";
import { getStrapiMediaUrl } from "@/shared/lib/getStrapiMediaUrl";
import { Carousel } from "@/shared/ui/Carousel";
import { Heading } from "@/shared/ui/Heading";
import { Loader } from "@/shared/ui/Loader";
import { Section } from "@/shared/ui/Section";
import { NewsCard } from "@/widgets/NewsCard/";
import { PromoCard } from "@/widgets/PromoCard";
import { useEffect, useState } from "react";

export const NewsCarousel = () => {
    const [isNewsLoading, setIsNewsLoading] = useState(true);
    const [isPromotionLoading, setIsPromotionLoading] = useState(true);
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [promotions, setPromotions] = useState<PromotionItem[]>([]);

    const loadNews = async () => {
        setIsNewsLoading(true);
        getCarouselNews(8)
            .then(({ data: newArticles }) => {
                setArticles(newArticles);
            })
            .catch((e) => {
                console.error("Error loading news:", e);
            })
            .finally(() => {
                setIsNewsLoading(false);
            });
    };

    const loadPromo = async () => {
        setIsPromotionLoading(true);
        getCarouselPromotions(8)
            .then(({ data: newPromotions }) => {
                setPromotions(newPromotions);
            })
            .catch((e) => {
                console.error("Error loading promotions:", e);
            })
            .finally(() => {
                setIsPromotionLoading(false);
            });
    };

    useEffect(() => {
        loadNews();
        loadPromo();
    }, []);

    const isLoading = isNewsLoading || isPromotionLoading;

    type CarouselItem =
        | { type: 'news'; data: ArticleItem }
        | { type: 'promo'; data: PromotionItem };

    const getItemDate = (item: CarouselItem): number => {
        const dateStr = item.type === 'news' ? item.data.date : item.data.dateStart;
        return new Date(dateStr).getTime();
    };

    const carouselItems: CarouselItem[] = [
        ...articles.map((article) => ({ type: 'news' as const, data: article })),
        ...promotions.map((promotion) => ({ type: 'promo' as const, data: promotion })),
    ].sort((a, b) => getItemDate(b) - getItemDate(a)); // от новых к старым

    return (
        <Section
            SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[40px] max-md:gap-[20px]"
            role="region"
            aria-label="news-list"
        >
            <Heading level={2} subtitle="Актуальные новости и события">
                Акции и <span className="text-accent">новости</span>
            </Heading>
            <div className="max-w-[1344px] w-full">
                {isLoading && <Loader />}
                {!isLoading && carouselItems.length > 0 && (
                    <Carousel
                        items={carouselItems}
                        desktopPageSize={1}
                        tabletPageSize={1}
                        mobilePageSize={1}
                        slideShow={true}
                        className='max-w-[1280px] max-xl:max-w-[700px]'
                        renderItem={(item) =>
                            item.type === 'news' ? (
                                <NewsCard key={`news-${item.data.id}`} newsInfo={item.data} className="max-w-none!" />
                            ) : (
                                <PromoCard {...item.data} image={getStrapiMediaUrl(item.data.image)} key={`promo-${item.data.id}`} className="max-w-none!" />
                            )
                        }
                    />
                )}
            </div>
        </Section>
    );
};
