import { controlOrganizations } from "@/shared/const/controlOrganizations";
import { getFormattedIndex } from "@/shared/lib/getFormattedIndex";
import { Section } from "@/shared/ui/Section";
import { ControlOrganizationCard } from "@/widgets/ControlOrganizationCard";

export const ControlOrganizationList = () => {
    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="control-organization-list"
        >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-[60px] gap-x-[30px] max-md:gap-y-[16px] max-md:gap-x-[30px]">
                {controlOrganizations.length > 0 && controlOrganizations.map((card, i) => (
                    <div className="flex items-center justify-center" key={i}>
                        <ControlOrganizationCard data={card} index={getFormattedIndex(i)}/>
                    </div>
                ))}
            </div>
        </Section>
    );
};
