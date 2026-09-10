import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { VacancyList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const VacanciesPage = () => {
    return (
        <>
            <Helmet>
                <title>Вакансии | Тело и дух</title>
                <meta name="description" content="Актуальные вакансии клиники «Тело и дух» в п. Заречье (МО). Приглашаем врачей и медицинский персонал в команду клиники превентивной медицины и биохакинга." />
                <meta name="keywords" content="вакансии клиники, работа врачом, медицинский персонал, работа в Заречье, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/vacancies" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="vacancies-heading"
                >
                    <Heading level={1} subtitle="Специальные предложения">Актуальные<br /><span className="text-accent">Вакансии</span></Heading>
                </Section>
                <VacancyList />
            </Page>
        </>
    );
};
export default VacanciesPage;
