import { Button } from "@/shared/ui/Button";
import { Section } from "@/shared/ui/Section";
import { TextInput } from "@/shared/ui/TextInput";
import PaperPlane from '@/shared/assets/icons/PaperPlane.svg'
import GeoTag from '@/shared/assets/icons/GeoTag.svg'
import Phone from '@/shared/assets/icons/Phone.svg'
import Instagram from '@/shared/assets/icons/Instagram.svg'
import { Icon } from "@/shared/ui/Icon";
import { Link as InlineLink } from "@/shared/ui/Link";
import { Link } from "react-router";
import { useDevice } from "@/shared/hooks/useDevice";
import { Map } from "@/widgets/Map";
import { RequestForm } from "@/features/RequestForm";

export const Contacts = () => {
    const { isMobile } = useDevice()

    return (
        <Section
            SectionClassName="py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-row gap-[100px] max-xl:flex-col max-xl:gap-[40px] items-strech"
            role="region"
            aria-label="contacts"
            id="contacts"
        >
            <RequestForm />
            <div className="flex flex-col pt-[64px] gap-[40px] w-full">
                <h2 className="font-h2 text-heading w-full uppercase"><span className="text-accent">Ждем вас</span><br/>в гости</h2>
                <div className="flex flex-col gap-[40px] w-full">
                    <div className="flex flex-row gap-[32px] w-full">
                        <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                            <Icon Svg={GeoTag} width={isMobile? 16: 24} height={isMobile? 16: 24} className="stroke-design-elements" />
                        </div>
                        <div className="flex flex-col gap-[16px] w-full">
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">Адрес</h5>
                                <p className="font-p-lg text-text-primary">МО, п. Заречье, ул. Торговая, д.5, пом. 8</p>
                            </div>
                            <InlineLink text="Построить маршрут" href="https://yandex.ru/maps/1/moscow-and-moscow-oblast/house/torgovaya_ulitsa_5/Z04YcgZhQEICQFtvfXp5cH9gYg==/?from=api-maps&indoorLevel=1&ll=37.412362%2C55.681100&origin=jsapi_3&utm_source=jsapi&z=16.8" openInNewTab className="self-start"/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[32px] w-full">
                        <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                            <Icon Svg={Phone} width={isMobile? 16: 24} height={isMobile? 16: 24} className="stroke-design-elements" />
                        </div>
                        <div className="flex flex-col gap-[16px] w-full">
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">Телефон</h5>
                                <p className="font-p-lg text-text-primary">+7 (495) 120-24-17</p>
                            </div>
                            <div className="flex flex-row gap-[24px]">
                                <Link to="https://t.me/tidclinic" target="_blank" rel="noopener noreferrer" aria-label="Telegram-канал клиники">
                                    <Icon Svg={PaperPlane} width={20} height={20} className="stroke-accent" />
                                </Link>
                                {/* <Link to="" target="_blank" aria-label="Instagram клиники">
                                    <Icon Svg={Instagram} width={20} height={20} className="stroke-accent" />
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center border border-background-secondary rounded-[5px] bg-gray-100 h-[442px]">
                    <Map />
                </div>
            </div>
        </Section>
    );
};
