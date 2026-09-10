import { useDevice } from "@/shared/hooks/useDevice";
import { Section } from "@/shared/ui/Section";

export const Philosophy = () => {
    const { isDesktop, } = useDevice()

    return (
        <Section
            SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px] bg-background-secondary"
            ContainerClassName="flex flex-col items-center gap-[40px] max-md:gap-[20px]"
            role="region"
            aria-label="philosophy"
        >
            <p className="font-lbl uppercase text-accent text-center w-full">философия</p>
            <p className="font-quote uppercase text-heading text-center w-full max-md:text-[24px]">
                «Здоровье — главный актив,{isDesktop && <br/>}
                над которым надо работать до того, как{isDesktop && <br/>}
                случится катастрофа. Мы создали пространство,{isDesktop && <br/>}
                где это наконец становится возможным.»
            </p>
        </Section>
    );
};
