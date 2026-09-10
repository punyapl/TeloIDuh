import { FAQItems } from "@/shared/const/FAQItems";
import { useScrollToSection } from "@/shared/hooks/useScrollToSection/useScrollToSection";
import { FAQAccordion,} from "@/shared/ui/FAQAccordion";
import { Link } from "@/shared/ui/Link";
import { Section } from "@/shared/ui/Section";

export const FAQ = () => {
    const scrollToSection = useScrollToSection();

    return (
        <Section
            SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-row gap-[100px] max-xl:flex-col max-xl:gap-[40px] items-start"
            role="region"
            aria-label="faq"
        >
            <div className="flex flex-col gap-[20px] w-full">
                <h2 className="font-h2 text-heading w-full uppercase">Часто задаваемые <span className="text-accent">вопросы</span></h2>
                <p className="font-sub text-text-secondary w-full">
                    Мы собрали ответы на самые популярные вопросы, чтобы вы могли лучше познакомиться с нашим подходом к здоровью.
                </p>
                <div className="flex flex-col gap-[24px] w-full bg-white rounded-[5px] p-[32px] border border-background-secondary">
                    <div className="flex flex-col gap-[10px] w-full">
                        <h5 className="font-h5 text-heading uppercase">Не нашли ответ?</h5>
                        <p className="font-p-sm text-text-secondary">Свяжитесь с нами напрямую, мы с радостью проконсультируем вас.</p>
                    </div>
                    <Link text="Задать свой вопрос" onClick={() => scrollToSection("contacts")} className="self-start" />
                </div>
            </div>
            <div className="w-full">
                <FAQAccordion items={FAQItems} />
            </div>
        </Section>
    );
};
