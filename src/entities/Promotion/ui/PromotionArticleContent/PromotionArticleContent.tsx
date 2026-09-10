import { Section } from "@/shared/ui/Section";
import { Heading } from "@/shared/ui/Heading";
import { Icon } from "@/shared/ui/Icon";
import { getRoutePromotions, getRouteServices } from "@/shared/const/router";
import Calendar from '@/shared/assets/icons/Calendar.svg'
import Checkmark from '@/shared/assets/icons/Checkmark.svg'
import { Link } from "@/shared/ui/Link";
import { formatDate } from "@/shared/lib/dateFormatter";
import { ArticleRenderer } from "../../../Article";
import { getStrapiMediaUrl } from "@/shared/lib/getStrapiMediaUrl";
import { Button } from "@/shared/ui/Button";
import { PromotionItem } from "../../types";

interface PromotionArticleContentProps {
    article: PromotionItem;
}

export const PromotionArticleContent = (props: PromotionArticleContentProps) => {
    const { article } = props;

    return (
        <>
            <Section
                SectionClassName="pt-[100px] pb-[60px] max-xl:pt-[50px] max-md:pt-[25px] max-xl:pb-[30px] max-md:pb-[16px] px-[48px] max-md:px-[24px]"
                ContainerClassName="flex flex-col gap-[40px]"
                role="region"
                aria-label="promotions-heading"
            >
                <Link text="Назад ко всем акциям" href={getRoutePromotions()} className="self-start" openInNewTab={false} />
                <div className="flex flex-col gap-[24px] max-md:gap-[12px] items-start">
                    <div className="flex gap-[40px] max-md:gap-[24px]">
                        <div className="px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight">-{article.discount}%</div>
                        <div className="flex flex-row items-center gap-[16px]">
                            <Icon Svg={Calendar} width={14} height={14} className='stroke-accent' />
                            <p className='font-lbl-card text-text-secondary'>{`${formatDate(article.dateStart, 'DD.MM.YYYY')} — ${formatDate(article.dateEnd, 'DD.MM.YYYY')}`}</p>
                        </div>
                    </div>
                    <Heading level={2}>{article.title}</Heading>
                </div>
            </Section>
            <Section
                SectionClassName="px-[48px] max-md:px-[24px] pb-[100px] max-xl:pb-[50px]"
                ContainerClassName="flex max-xl:flex-col-reverse gap-[40px] max-md:gap-[20px]"
                role="region"
                aria-label="Promotion-article"
            >
                <div className="flex flex-col gap-[40px] w-full">
                    <ArticleRenderer body={article.content} />
                    <div className="flex flex-col gap-[40px] p-[40px] bg-white rounded-[5px]">
                        <h4 className="font-h4 text-heading uppercase">Условия действия акции</h4>
                        <div className="flex flex-col gap-[16px] w-full">
                            {
                                article.conditions.map((condition, i) => (
                                    <div className="flex gap-[10px] w-full items-center">
                                        <div className="flex items-center justify-between p-[5px] w-[24px] h-[24px] rounded-full bg-background-secondary aspect-square">
                                            <Icon Svg={Checkmark} width={14} height={14} className="stroke-accent" />
                                        </div>
                                        <p className="font-cap text-text-primary leading-normal uppercase">{condition}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex max-md:flex-col gap-[40px] justify-between">
                        {/* <Button theme="default" text="Записаться" className="w-full" /> */}
                        <Button theme="light" text="Все услуги клиники" onClick={() => location.replace(getRouteServices())} className="w-full" />
                    </div>
                </div>
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
