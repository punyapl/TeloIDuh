import { MOCK_DIRECTIONS } from "@/shared/const/mockDirections";
import { Accordion } from "@/shared/ui/Accordion";
import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";

export const Directions = () => {
    return (
        <Section
            SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[40px] max-md:gap-[20px]"
            role="region"
            aria-label="directions-heading"
        >
            <Heading level={2} subtitle="Создание долголетия с помощью науки">
                наши <span className="text-accent">направления</span>
            </Heading>
            <div className="max-w-[1344px] w-full">
                <Accordion items={MOCK_DIRECTIONS} />
            </div>
        </Section>
    );
};
