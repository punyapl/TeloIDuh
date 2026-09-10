import Calendar from '@/shared/assets/icons/Calendar.svg'
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg";
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { getRoutePromotion } from '@/shared/const/router';
import { formatDate } from '@/shared/lib/dateFormatter';

interface PromoCardProps {
    slug: string;
    title: string;
    image: string;
    shortDescription: string;
    dateStart: string;
    dateEnd: string;
    discount: string;
    className?: string;
}

export const PromoCard = (props: PromoCardProps) => {
    const { slug, title, image, shortDescription, dateStart, dateEnd, discount, className } = props

    return (
        <div className={`flex flex-col rounded-[5px] overflow-hidden 
            bg-white border border-background-secondary xl:max-w-[657px] 
            w-full h-full hover:border-accent hover:shadow-lg transition-all duration-300 ${className || ''}`}
        >
            <div className="relative w-full h-[300px] overflow-hidden bg-background-secondary shrink-0">
                <div className="absolute inset-0 image-gradient"></div>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-[24px] left-[24px] px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight">{`-${discount}%`}</div>
                <div className="absolute bottom-[24px] left-[24px] flex flex-row items-center gap-[16px]">
                    <Icon Svg={Calendar} width={14} height={14} className='stroke-accent'/>
                    <p className='font-lbl-card text-background'>{`${formatDate(dateStart, 'DD.MM.YYYY')} — ${formatDate(dateEnd, 'DD.MM.YYYY')}`}</p>
                </div>
            </div>
            <div className='flex flex-col gap-[40px] max-md:gap-[20px] justify-between p-[40px] h-full'>
                <div className='flex flex-col gap-[16px] w-full'>
                    <h4 className='font-h4 text-heading uppercase line-clamp-3 max-md:line-clamp-2'>{title}</h4>
                    <p className='font-p-sm text-text-primary w-full line-clamp-4 max-md:line-clamp-2 leading-[120%]'>{shortDescription}</p>
                </div>
                <Button theme='default' text="Подробнее об акции" icon={ArrowRight} onClick={() => location.replace(getRoutePromotion(slug))}/>
            </div>
        </div>
    );
};
