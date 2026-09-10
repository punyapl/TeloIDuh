import Clock from "@/shared/assets/icons/Clock.svg"
import Card from "@/shared/assets/icons/Card.svg"
import { Icon } from "@/shared/ui/Icon";
import { Button } from "@/shared/ui/Button";

interface ServiceCardProps {
    category: string;
    index: string;
    title: string;
    duration: string;
    price: string;
}

export const ServiceCard = (props: ServiceCardProps) => {
    const { category, index, title, duration, price } = props;

    return (
        <div 
            className="
                flex flex-col gap-[40px] max-md:gap-[20px] justify-between p-[40px] xl:max-w-[428px] w-full h-[340px] max-md:h-[300px]
                bg-white rounded-[5px] border border-background-secondary 
                hover:border-accent hover:shadow-lg transition-all duration-300
            "
        >
            <div className="flex flex-col gap-[16px] w-full">
                <div className="flex flex-row justify-between w-full items-center">
                    <p className="font-lbl-number text-accent uppercase">{category}</p>
                    <p className="font-lbl-number text-design-elements uppercase">{index}</p>
                </div>
                <h4 className="font-h4 text-heading uppercase w-full line-clamp-3 max-md:line-clamp-2">
                    {title}
                </h4>
            </div>
            <div className="flex flex-col gap-[20px] w-full">
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-row gap-[12px] items-center">
                        <Icon Svg={Clock} width={14} height={14} className="stroke-accent"/>
                        <p className="font-lbl-card text-text-primary uppercase">{duration}</p>
                    </div>
                    <div className="flex flex-row gap-[12px] items-center">
                        <Icon Svg={Card} width={14} height={14} className="stroke-accent"/>
                        <p className="font-lbl-card text-text-primary uppercase">{price}</p>
                    </div>
                </div>
                <Button theme="default" text="Записаться"/>
            </div>
        </div>
    );
}
