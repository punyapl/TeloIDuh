import { getRouteUsefulMaterials } from "@/shared/const/router";
import { Heading } from "@/shared/ui/Heading";
import { Link } from "@/shared/ui/Link";
import { Section } from "@/shared/ui/Section";
import { DepressionScale } from "@/widgets/DepressionScale";
import { Page } from "@/widgets/Page";
import { Helmet } from "react-helmet-async";

const DepressionScalePage = () => {
    return (
        <>
        <Helmet>
    <title>Шкала депрессии Бека II (BDI-II) | Тело и дух</title>
    <meta name="description" content="Пройдите онлайн-тест по шкале депрессии Бека II (BDI-II) — стандартизированный самоопросник из 21 пункта для оценки выраженности депрессивных симптомов у людей старше 13 лет." />
    <meta name="keywords" content="шкала депрессии Бека, BDI-II, тест на депрессию, самоопросник, депрессивные симптомы, психологический тест онлайн" />
    <link rel="canonical" href="https://teloiduh.ru/useful/depression-scale" />
</Helmet>
        <Page>
            <Section
                SectionClassName="pt-[100px] pb-[60px] max-xl:pt-[50px] max-md:pt-[25px] max-xl:pb-[30px] max-md:pb-[16px] px-[48px] max-md:px-[24px]"
                ContainerClassName="flex flex-col gap-[40px]"
                role="region"
                aria-label="promotions-heading"
            >
                <Link text="Назад к полезным материалам" href={getRouteUsefulMaterials()} className="self-start" openInNewTab={false} />
                <div className="flex flex-col gap-[24px] max-md:gap-[12px] items-start">
                    <div className="flex gap-[40px] max-md:gap-[24px]">
                        <div className="px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight uppercase">Тест</div>
                    </div>
                    <div className="flex flex-col gap-[10px] w-full">
                        <Heading level={2}>Шкала депрессии Бека II (BDI-II)</Heading>
                    </div>
                </div>
                <p className="font-p-lg text-text-primary">Оцените выраженность депрессивных симптомов.<br />Стандартизированный самоопросник из 21 пункта для оценки выраженности депрессивных симптомов у людей старше 13 лет.</p>
            </Section>
            <DepressionScale />
        </Page>
        </>
    );
};
export default DepressionScalePage;
