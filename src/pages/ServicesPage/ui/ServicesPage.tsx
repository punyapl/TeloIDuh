import { Page } from "@/widgets/Page";
import { Section } from "@/shared/ui/Section";
import { Heading } from "@/shared/ui/Heading";
import { ServiceList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const ServicesPage = () => {
    return (
        <>
            <Helmet>
                <title>Услуги | Тело и дух</title>
                <meta name="description" content="Услуги клиники «Тело и дух»: приём врачей (терапевт, кардиолог, невролог, гинеколог, педиатр), УЗИ диагностика, ЭКГ, капельницы, анализы и чек-апы. п. Заречье (МО)." />
                <meta name="keywords" content="услуги клиники, приём врачей, УЗИ, ЭКГ, капельницы, анализы, чек-ап, терапевт, кардиолог, педиатр, Заречье, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/services" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="services-heading"
                >
                    <Heading level={1} subtitle="Наши направления">Услуги<br /><span className="text-accent">клиники</span></Heading>
                </Section>
                <ServiceList />
            </Page>
        </>
    );
};

export default ServicesPage;
