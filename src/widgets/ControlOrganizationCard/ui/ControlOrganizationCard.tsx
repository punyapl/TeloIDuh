import { Button } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import GeoTag from '@/shared/assets/icons/GeoTag.svg'
import Phone from '@/shared/assets/icons/Phone.svg'
import Letter from '@/shared/assets/icons/Letter.svg'
import Clock from '@/shared/assets/icons/Clock.svg'
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg"
import { useDevice } from "@/shared/hooks/useDevice";
import { ControlOrganization } from "@/entities/ControlOrganization/types";

interface ControlOrganizationCardProps {
    data: ControlOrganization;
    index: string;
}

export const ControlOrganizationCard = (props: ControlOrganizationCardProps) => {
    const { data, index, } = props;
    const { isMobile } = useDevice()

    return (
        <div
            className="
                flex flex-col gap-[40px] max-md:gap-[20px] justify-between p-[40px] xl:max-w-[657px] w-full h-full
                bg-white rounded-[5px] border border-background-secondary 
                hover:border-accent hover:shadow-lg transition-all duration-300
            "
        >
            <div className="flex flex-col gap-[40px] max-md:gap-[20px] w-full">
                <div className="flex flex-col gap-[30px] w-full">
                    <div className="flex flex-row justify-between w-full items-center">
                        <p className="font-lbl-number text-accent uppercase">{data.category}</p>
                        <p className="font-lbl-number text-design-elements uppercase">{index}</p>
                    </div>
                    <div className="flex flex-col gap-[16px] w-full">
                        <h4 className="font-h4 text-heading uppercase w-full line-clamp-4 max-md:line-clamp-2">
                            {data.title}
                        </h4>
                        <p className="font-p-sm text-text-primary line-clamp-5 max-md:line-clamp-4 leading-[120%]">{data.description}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                    {data.address &&
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={GeoTag} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">АДРЕС</h5>
                                <p className="font-p-lg text-text-primary">{data.address}</p>
                            </div>
                        </div>
                    }
                    {
                        data.phone &&
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={Phone} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">ТЕЛЕФОН{data.phone.length > 1 && 'ы'}</h5>
                                {
                                    data.phone.map((item, index) => (
                                        <p className="font-p-lg text-text-primary" key={index}>{item}</p>
                                    ))
                                }
                            </div>
                        </div>
                    }
                    {
                        data.email &&
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={Letter} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">Почта</h5>
                                <p className="font-p-lg text-text-primary">{data.email}</p>
                            </div>
                        </div>
                    }
                    {
                        data.workingHours &&
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={Clock} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">График работы</h5>
                                {
                                    data.workingHours.map((item, index) => (
                                        <p className="font-p-lg text-text-primary" key={index}>{item}</p>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            {
                data.link &&
                <Button theme="default" text="Подробнее" icon={ArrowRight} onClick={() => window.open(data.link, '_blank')} />
            }
        </div>
    );
};
