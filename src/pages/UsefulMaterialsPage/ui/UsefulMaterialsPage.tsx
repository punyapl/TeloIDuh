import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { UsefulMaterialList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const UsefulMaterialsPage = () => {
    return (
        <>
            <Helmet>
                <title>Полезные материалы | Тело и дух</title>
                <meta name="description" content="Полезные материалы клиники «Тело и дух»: онлайн-калькуляторы и тесты для оценки здоровья. Калькулятор сердечно-сосудистого здоровья, опросник STOP-BANG, шкала депрессии Бека." />
                <meta name="keywords" content="полезные материалы, калькулятор здоровья, тест на апноэ, шкала депрессии, онлайн тесты, превентивная медицина, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/useful" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="useful-materials-heading"
                >
                    <Heading level={1} subtitle="Собрали самое интересное">Полезные<br /><span className="text-accent">материалы</span></Heading>
                </Section>
                <UsefulMaterialList />
            </Page>
        </>
    );
};
export default UsefulMaterialsPage;
