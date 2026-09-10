import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { PromoList } from "@/widgets/PageSections";
import { Helmet } from "react-helmet-async";

const PromotionsPage = () => {
    return (
        <>
            <Helmet>
                <title>Акции и скидки | Тело и дух</title>
                <meta name="description" content="Актуальные акции и специальные предложения клиники «Тело и дух». Скидки на консультации врачей, чек-апы, УЗИ и другие медицинские услуги в п. Заречье (МО)." />
                <meta name="keywords" content="акции клиники, скидки на медицинские услуги, специальные предложения, чек-ап со скидкой, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/promo" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                    role="region"
                    aria-label="promotions-heading"
                >
                    <Heading level={1} subtitle="Специальные предложения">Актуальные<br /><span className="text-accent">Акции и скидки</span></Heading>
                </Section>
                <PromoList />
            </Page>
        </>
    );
};
export default PromotionsPage;
