import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { ContactsAndDetails } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const ContactsPage = () => {
    return (
        <>
            <Helmet>
                <title>Контакты | Тело и дух</title>
                <meta name="description" content="Адрес клиники «Тело и дух»: МО, п. Заречье, ул. Торговая, д. 5. Телефон: +7 (495) 120-24-17. Режим работы, схема проезда и реквизиты организации." />
                <meta name="keywords" content="контакты клиники, адрес, как доехать, Заречье, Одинцово, телефон клиники, реквизиты, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/contacts" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="contacts-heading"
                >
                    <Heading level={1} subtitle="Связи и координаты">Контакты<br /><span className="text-accent">и реквизиты</span></Heading>
                </Section>
                <ContactsAndDetails />
            </Page>
        </>
    );
};
export default ContactsPage;
