import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { ControlOrganizationList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const ControlOrganizationsPage = () => {
    return (
        <>
            <Helmet>
                <title>Контролирующие организации | Тело и дух</title>
                <meta name="description" content="Государственные органы, осуществляющие контроль деятельности клиники «Тело и дух»: надзорные ведомства, контакты и полномочия." />
                <meta name="keywords" content="контролирующие организации, государственный контроль, надзор, медицинская лицензия, Росздравнадзор, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/control-organizations" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="control-organizations-heading"
                >
                    <Heading level={1} subtitle="Государственный контроль">Контролирующие<br /><span className="text-accent">Организации</span></Heading>
                </Section>
                <ControlOrganizationList />
            </Page>
        </>
    );
};
export default ControlOrganizationsPage;
