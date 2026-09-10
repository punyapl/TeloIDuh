import { usefulMaterials } from "@/shared/const/usefulMaterialsInfo";
import { Carousel } from "@/shared/ui/Carousel";
import { Heading } from "@/shared/ui/Heading";
import { Section } from "@/shared/ui/Section";
import { UsefulMaterialCard } from "@/widgets/UsefulMaterialCard";

export const CalculatorCarousel = () => {
    return (
    <Section
                SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                ContainerClassName="flex flex-col gap-[40px] max-md:gap-[20px]"
                role="region"
                aria-label="useful-materials-list"
            >
                <Heading level={2} subtitle="Калькуляторы и тесты для вашего здоровья">
                    Полезные <span className="text-accent">материалы</span>
                </Heading>
                <div className="max-w-[1344px] w-full">
                    <Carousel
                        items={usefulMaterials}
                        desktopPageSize={3}
                        tabletPageSize={1}
                        mobilePageSize={1}
                        slideShow
                        className='max-w-[1280px] max-xl:max-w-[700px]'
                        renderItem={(usefulMaterial) => (
                            <UsefulMaterialCard {...usefulMaterial} />
                        )}
                    />
                </div>
            </Section>
);
};
