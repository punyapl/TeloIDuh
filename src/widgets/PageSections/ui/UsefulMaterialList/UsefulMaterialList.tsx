import { usefulMaterials } from "@/shared/const/usefulMaterialsInfo";
import { Section } from "@/shared/ui/Section";
import { UsefulMaterialCard } from "@/widgets/UsefulMaterialCard";

export const UsefulMaterialList = () => {
    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="promotion-list"
        >
            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-x-[30px] gap-y-[60px] max-md:gap-x-[16px] max-md:gap-y-[30px] mt-[60px]">
                {usefulMaterials.map((card, i) => (
                    <div className="flex items-center justify-center" key={i}>
                        <UsefulMaterialCard {...card} />
                    </div>
                ))}
            </div>
        </Section>
    );
};
