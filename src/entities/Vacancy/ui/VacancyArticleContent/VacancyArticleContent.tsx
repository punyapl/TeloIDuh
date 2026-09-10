import { Section } from "@/shared/ui/Section";
import { Heading } from "@/shared/ui/Heading";
import { getRouteVacancies } from "@/shared/const/router";
import { Link } from "@/shared/ui/Link";
import { ArticleRenderer } from "../../../Article";
import { VacancyItem } from "../../types";

interface VacancyArticleContentProps {
    article: VacancyItem;
}

export const VacancyArticleContent = (props: VacancyArticleContentProps) => {
    const { article } = props;

    return (
        <>
            <Section
                    SectionClassName="pt-[100px] pb-[60px] max-xl:pt-[50px] max-md:pt-[25px] max-xl:pb-[30px] max-md:pb-[16px] px-[48px] max-md:px-[24px]"
                    ContainerClassName="flex flex-col gap-[40px]"
                    role="region"
                    aria-label="vacancy-heading"
                >
                    <Link text="Назад ко всем Вакансиям" href={getRouteVacancies()} className="self-start" openInNewTab={false} />
                    <div className="flex flex-col gap-[24px] max-md:gap-[12px] items-start">
                        <div className="px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight uppercase">{article.category}</div>
                        <Heading level={2}>{article.title}</Heading>
                    </div>
                </Section>
            <Section
                SectionClassName="px-[48px] max-md:px-[24px] pb-[100px] max-xl:pb-[50px]"
                ContainerClassName="flex max-xl:flex-col-reverse gap-[40px] max-md:gap-[20px]"
                role="region"
                aria-label="Vacancy-article"
            >
                <div className="flex flex-col gap-[40px] w-full">
                    <span className="font-h4 font-heading text-text-secondary">{article.salary}</span>
                    <ArticleRenderer body={article.content} />
                </div>
            </Section>
        </>
    );
};
