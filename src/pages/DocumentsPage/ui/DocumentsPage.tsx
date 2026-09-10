import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { DocumentList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const DocumentsPage = () => {
    return (
        <>
            <Helmet>
                <title>Нормативные документы | Тело и дух</title>
                <meta name="description" content="Лицензии, сертификаты и нормативные документы клиники «Тело и дух». Документы врачей, договора и разрешительная документация на осуществление медицинской деятельности." />
                <meta name="keywords" content="документы клиники, лицензия на медицинскую деятельность, сертификаты, нормативные документы, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/documents" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="documents-heading"
                >
                    <Heading level={1} subtitle="Наши документы">Нормативные<br /><span className="text-accent">документы</span></Heading>
                </Section>
                <DocumentList />
            </Page>
        </>
    );
};
export default DocumentsPage;
