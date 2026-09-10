import { getRouteUsefulMaterials } from "@/shared/const/router";
import { Heading } from "@/shared/ui/Heading";
import { Link } from "@/shared/ui/Link";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { StopBangQuiz } from "@/widgets/StopBangQuiz";
import { Helmet } from "react-helmet-async";

const StopBangQuizPage = () => {
    return (
        <>
            <Helmet>
                <title>Опросник STOP-BANG | Тело и дух</title>
                <meta name="description" content="Пройдите онлайн-тест STOP-BANG для оценки риска синдрома обструктивного апноэ сна. Простой и точный опросник — первый шаг к здоровому и спокойному сну." />
                <meta name="keywords" content="STOP-BANG, апноэ сна, синдром обструктивного апноэ, тест на апноэ, опросник онлайн, нарушения сна, тело и дух" />
                <link rel="canonical" href="https://teloiduh.ru/useful/stop-bang-quiz" />
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
                            <Heading level={2}>Опросник STOP-BANG</Heading>
                        </div>
                    </div>
                    <p className="font-p-lg text-text-primary">Оцените свой риск развития синдрома обструктивного апноэ сна с помощью простого и точного опросника — первого шага к спокойному и здоровому сну.</p>
                </Section>
                <StopBangQuiz />
            </Page>
        </>
    );
};
export default StopBangQuizPage;
