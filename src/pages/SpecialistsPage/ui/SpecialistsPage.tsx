import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { SpecialistList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const SpecialistsPage = () => {
    return (
        <>
            <Helmet>
                <title>Специалисты | Тело и дух</title>
                <meta name="description" content="Врачи клиники «Тело и дух»: терапевты, кардиологи, неврологи, гинекологи, педиатры и другие специалисты превентивной медицины в п. Заречье (МО)." />
                <meta name="keywords" content="врачи клиники, специалисты, терапевт, кардиолог, невролог, гинеколог, педиатр, превентивная медицина, Заречье, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/specialists" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="specialists-heading"
                >
                    <Heading level={1} subtitle="Наши команда">Специалисты<br /><span className="text-accent">клиники</span></Heading>
                </Section>
                <SpecialistList />
            </Page>
        </>
    );
};
export default SpecialistsPage;
