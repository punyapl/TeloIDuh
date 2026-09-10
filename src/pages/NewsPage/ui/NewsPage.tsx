import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { NewsList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const NewsPage = () => {
    return (
        <>
            <Helmet>
                <title>Новости и статьи | Тело и дух</title>
                <meta name="description" content="Статьи и новости клиники «Тело и дух» о превентивной медицине, биохакинге и здоровом долголетии. Экспертные материалы от врачей клиники." />
                <meta name="keywords" content="новости клиники, статьи о здоровье, превентивная медицина, биохакинг, долголетие, здоровый образ жизни, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/news" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="news-heading"
                >
                    <Heading level={1} subtitle="Новости">Тело и дух<br /><span className="text-accent">знания системы</span></Heading>
                </Section>
                <NewsList />
            </Page>
        </>
    );
};
export default NewsPage;
