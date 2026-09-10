import { Section } from "@/shared/ui/Section";
import { ArticleItem } from "../../../Article";
import { Heading } from "@/shared/ui/Heading";
import { Icon } from "@/shared/ui/Icon";
import { getRouteNews } from "@/shared/const/router";
import Calendar from '@/shared/assets/icons/Calendar.svg'
import { Link } from "@/shared/ui/Link";
import { formatDate } from "@/shared/lib/dateFormatter";
import { ArticleRenderer } from "../../../Article";
import { getStrapiMediaUrl } from "@/shared/lib/getStrapiMediaUrl";

interface NewsArticleContentProps {
    article: ArticleItem;
}

export const NewsArticleContent = (props: NewsArticleContentProps) => {
    const { article } = props;

    return (
        <>
                <Section
                    SectionClassName="pt-[100px] pb-[60px] max-xl:pt-[50px] max-md:pt-[25px] max-xl:pb-[30px] max-md:pb-[16px] px-[48px] max-md:px-[24px]"
                    ContainerClassName="flex flex-col gap-[40px]"
                    role="region"
                    aria-label="news-article-heading"
                >
                    <Link text="Назад ко всем статьям" href={getRouteNews()} className="self-start" openInNewTab={false} />
                    <div className="flex flex-col gap-[24px] max-md:gap-[12px] items-start">
                        <div className="flex gap-[40px] max-md:gap-[24px]">
                            <div className="px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight uppercase">{article.theme}</div>
                            <div className="flex flex-row items-center gap-[16px]">
                                <Icon Svg={Calendar} width={14} height={14} className='stroke-accent' />
                                <p className='font-lbl-card text-text-secondary'>{formatDate(article.date, 'DD.MM.YYYY')}</p>
                            </div>
                        </div>
                        <Heading level={2}>{article.title}</Heading>
                    </div>
                </Section>
                <Section
                    SectionClassName="px-[48px] max-md:px-[24px]"
                    ContainerClassName="flex max-xl:flex-col-reverse gap-[40px] max-md:gap-[20px]"
                    role="region"
                    aria-label="news-article"
                >
                    <ArticleRenderer body={article.content} />
                    <div className="w-[500px] max-xl:w-full h-[600px] max-md:h-[300px] overflow-hidden bg-background-secondary rounded-[5px] shrink-0 group">
                        <img
                            src={getStrapiMediaUrl(article.image)}
                            alt={article.title}
                            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                        />
                    </div>
                </Section>
            </>
    );
};
