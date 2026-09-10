import { VacancyItem } from "@/entities/Vacancy/types";
import { Section } from "@/shared/ui/Section";
import { useState, useEffect } from "react";
import { useParams, } from "react-router";
import { getVacancyBySlug } from "@/entities/Vacancy/api/vacancy";
import { VacancyForm } from "@/features/VacancyForm";
import { Loader } from "@/shared/ui/Loader";
import { VacancyArticleContent } from "@/entities/Vacancy";
import { Helmet } from "react-helmet-async";

export const VacancyDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const [vacancy, setVacancy] = useState<VacancyItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        getVacancyBySlug(slug)
            .then(setVacancy)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [slug]);

    if (isLoading) {
        return <div className="w-full h-full flex justify-center items-center"><Loader /></div>
    } else if (!vacancy) {
        return <div className="w-full h-full flex justify-center items-center"><p className="font-p-md text-text-secondary">Статья не найдена</p></div>
    } else {
        return (
            <>
                <Helmet>
                    <title>{`${vacancy.title} | Вакансии | Тело и дух`}</title>
                    <meta name="description" content={`${vacancy.shortDescription} Зарплата: ${vacancy.salary}. Клиника «Тело и дух», п. Заречье (МО).`} />
                    <meta name="keywords" content={`${vacancy.category}, вакансия, работа в клинике, ${vacancy.title.toLowerCase()}, тело и дух`} />
                    <link rel="canonical" href={`https://teloiduh.ru/vacancy/${vacancy.slug}`} />
                </Helmet>
                <VacancyArticleContent article={vacancy} />
                <Section
                    SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
                    ContainerClassName="flex flex-col items-center gap-[40px] max-md:gap-[20px]"
                    role="region"
                    aria-label="vacancy-form"
                >
                    <VacancyForm vacancyTitle={vacancy.title} />
                </Section>
            </>
        );
    }
};
