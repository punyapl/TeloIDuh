import { Button } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import Calendar from '@/shared/assets/icons/Calendar.svg'
import { formatDate } from "@/shared/lib/dateFormatter";
import { DocumentCard as DocumentCardType } from "@/entities/Document/types";
import { getStrapiMediaUrl } from "@/shared/lib/getStrapiMediaUrl";

interface DocumentCardProps {
    data: DocumentCardType;
    index: string;
}

export const DocumentCard = (props: DocumentCardProps) => {
    const { data, index } = props;

    return (
        <div
            className="
                flex flex-col gap-[40px] max-md:gap-[20px] justify-between p-[40px] xl:max-w-[428px] w-full h-[370px] max-md:h-[300px]
                bg-white rounded-[5px] border border-background-secondary 
                hover:border-accent hover:shadow-lg transition-all duration-300
            "
        >
            <div className="flex flex-col gap-[16px] w-full">
                <div className="flex flex-row justify-between w-full items-center">
                    <p className="font-lbl-number text-accent uppercase">{data.category}</p>
                    <p className="font-lbl-number text-design-elements uppercase">{index}</p>
                </div>
                <h4 className="font-h4 text-heading uppercase w-full line-clamp-4 max-md:line-clamp-2">
                    {data.title}
                </h4>
            </div>
            <div className="flex flex-col gap-[20px] w-full">
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-row gap-[12px] items-center">
                        <p className="font-lbl-card text-text-primary uppercase">Дата документа</p>
                    </div>
                    <div className="flex flex-row gap-[12px] items-center">
                        <Icon Svg={Calendar} width={14} height={14} className="stroke-accent" />
                        <p className="font-lbl-card text-text-primary uppercase">{formatDate(data.date, 'DD.MM.YYYY')}</p>
                    </div>
                </div>
                <Button theme="default" text="Открыть" onClick={() => window.open(getStrapiMediaUrl(data.file), '_blank')}/>
            </div>
        </div>
    );
};
