import { Button } from "@/shared/ui/Button";
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg"
import { getRouteVacancy } from "@/shared/const/router";

interface VacancyCardProps {
    category: string;
    slug: string;
    index: string;
    title: string;
    shortDescription: string;
    salary: string;
}

export const VacancyCard = (props: VacancyCardProps) => {
    const { category, slug, index, title, shortDescription, salary } = props;

    return (
        <div
            className="
                flex flex-col gap-[40px] max-md:gap-[20px] justify-between p-[40px] xl:max-w-[657px] w-full h-full
                bg-white rounded-[5px] border border-background-secondary 
                hover:border-accent hover:shadow-lg transition-all duration-300
            "
        >
            <div className="flex flex-col gap-[30px] w-full">
                <div className="flex flex-row justify-between w-full items-center">
                    <p className="font-lbl-number text-accent uppercase">{category}</p>
                    <p className="font-lbl-number text-design-elements uppercase">{index}</p>
                </div>
                <div className="flex flex-col gap-[16px] w-full">
                    <h4 className="font-h4 text-heading uppercase w-full line-clamp-3 max-md:line-clamp-2">
                        {title}
                    </h4>
                    <p className="font-lbl-card text-text-secondary uppercase">{salary}</p>
                    <p className="font-p-sm text-text-primary line-clamp-4 max-md:line-clamp-2 leading-[120%]">{shortDescription}</p>
                </div>

            </div>
            <Button theme="default" text="Подробнее о Вакансии" icon={ArrowRight} onClick={() => location.replace(getRouteVacancy(slug))} />
        </div>
    );
};
