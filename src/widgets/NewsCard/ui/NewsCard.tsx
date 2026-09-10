import Calendar from '@/shared/assets/icons/Calendar.svg'
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg";
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { getRouteNewsArticle, } from '@/shared/const/router';
import { formatDate } from '@/shared/lib/dateFormatter';
import { ArticleItem } from '@/entities/Article';
import { getStrapiMediaUrl } from '@/shared/lib/getStrapiMediaUrl';

interface NewsCardProps {
    newsInfo: ArticleItem;
    className?: string;
}

export const NewsCard = (props: NewsCardProps) => {
    const { newsInfo, className } = props

    return (
        <div className={`flex flex-col rounded-[5px] overflow-hidden 
            bg-white border border-background-secondary xl:max-w-[426px] w-full h-full
            hover:border-accent hover:shadow-lg transition-all duration-300 ${className || ''}`}
        >
            <div className="relative w-full h-[300px] overflow-hidden bg-background-secondary shrink-0">
                <div className="absolute inset-0 image-gradient" />
                <img
                    src={getStrapiMediaUrl(newsInfo.image)}
                    alt={newsInfo.title}
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-[24px] left-[24px] px-[16px] py-[10px] bg-accent rounded-[5px] font-lbl text-background leading-tight uppercase">{newsInfo.theme}</div>
                <div className="absolute bottom-[24px] right-[24px] flex flex-row items-center gap-[16px]">
                    <Icon Svg={Calendar} width={14} height={14} className='stroke-accent' />
                    <p className='font-lbl-card text-background'>{formatDate(newsInfo.date, 'DD.MM.YYYY')}</p>
                </div>
            </div>
            <div className='flex flex-col gap-[40px] max-md:gap-[20px] justify-between p-[40px] h-full'>
                <div className='flex flex-col gap-[16px] w-full'>
                    <h4 className='font-h4 text-heading uppercase line-clamp-3 max-md:line-clamp-2'>{newsInfo.title}</h4>
                    <p className='font-p-sm text-text-primary w-full line-clamp-4 max-md:line-clamp-2 leading-[120%]'>{newsInfo.shortDescription}</p>
                </div>
                <Button theme='default' text="Читать" icon={ArrowRight} onClick={() => location.replace(getRouteNewsArticle(newsInfo.slug))} />
            </div>
        </div>
    );
};
