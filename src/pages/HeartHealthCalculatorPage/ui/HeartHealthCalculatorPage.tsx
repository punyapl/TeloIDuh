import { getRouteUsefulMaterials } from "@/shared/const/router";
import { Heading } from "@/shared/ui/Heading";
import { Link as LinkButton } from "@/shared/ui/Link";
import { Section } from "@/shared/ui/Section";
import { HeartHealthCalculator } from "@/widgets/HeartHealthCalculator";
import { Page } from "@/widgets/Page";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const HeartHealthCalculatorPage = () => {
    return (
        <>
            <Helmet>
                <title>Калькулятор сердечно-сосудистого здоровья | Тело и дух</title>
                <meta name="description" content="Оцените здоровье сердечно-сосудистой системы онлайн. Калькулятор основан на концепции Life Essential 8 Американской ассоциации сердца — бесплатно и без регистрации." />
                <meta name="keywords" content="калькулятор сердечно-сосудистого здоровья, Life Essential 8, здоровье сердца, риск сердечно-сосудистых заболеваний, онлайн калькулятор, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/useful/heart-health-calculator" />
            </Helmet>
            <Page>
                <Section
                    SectionClassName="pt-[100px] pb-[60px] max-xl:pt-[50px] max-md:pt-[25px] max-xl:pb-[30px] max-md:pb-[16px] px-[48px] max-md:px-[24px]"
                    ContainerClassName="flex flex-col gap-[40px]"
                    role="region"
                    aria-label="promotions-heading"
                >
                    <LinkButton text="Назад к полезным материалам" href={getRouteUsefulMaterials()} className="self-start" openInNewTab={false} />
                    <div className="flex flex-col gap-[24px] max-md:gap-[12px] items-start">
                        <div className="flex gap-[40px] max-md:gap-[24px]">
                            <div className="px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight uppercase">Калькулятор</div>
                        </div>
                        <Heading level={2}>Калькулятор сердечно-сосудистого здоровья</Heading>
                    </div>
                    <p className="font-p-lg text-text-primary">Насколько на самом деле здоров ваш организм? На сайте клиники «Тело и дух» можно бесплатно пройти калькулятор здоровья, построенный на концепции 
                        <Link to="https://www.heart.org/en/healthy-living/healthy-lifestyle/lifes-essential-8" target="_blank" rel="noopener noreferrer"> <span className="font-inline-link">Life's Essential 8</span> </Link> 
                        от Американской ассоциации сердца (AHA).<br/>Специально для наших пациентов мы разработали уникальный калькулятор, который учитывает восемь факторов: питание, сон, физическую активность, индекс массы тела, курение, холестерин, глюкозу (HbA1c) и артериальное давление, и сводит их в один наглядный результат буквально за пару минут.
                        <br />Регистрация не нужна. Оплата тоже. Заполнили поля, нажали «Рассчитать» и получили честную картину состояния вашего здоровья и сердечно-сосудистой системы.
                        <br/>Стоит отметить: это не диагноз, а ориентир, с которым уже можно идти к врачу и обсуждать программу профилактики. Попробуйте прямо сейчас, результат может оказаться неожиданным.
                        </p>
                </Section>
                <HeartHealthCalculator />
            </Page>
        </>
    );
};
export default HeartHealthCalculatorPage;
