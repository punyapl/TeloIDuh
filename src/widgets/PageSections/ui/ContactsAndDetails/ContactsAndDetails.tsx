import { Heading } from "@/shared/ui/Heading";
import { Icon } from "@/shared/ui/Icon";
import { Link as InlineLink } from "@/shared/ui/Link";
import { Section } from "@/shared/ui/Section";
import { Link } from "react-router";
import PaperPlane from '@/shared/assets/icons/PaperPlane.svg'
import GeoTag from '@/shared/assets/icons/GeoTag.svg'
import Phone from '@/shared/assets/icons/Phone.svg'
import Instagram from '@/shared/assets/icons/Instagram.svg'
import Letter from '@/shared/assets/icons/Letter.svg'
import Clock from '@/shared/assets/icons/Clock.svg'
import CheckmarkCircle from '@/shared/assets/icons/CheckmarkCircle.svg'
import { getFormattedIndex } from "@/shared/lib/getFormattedIndex";
import QRPlaceholder from "@/shared/assets/images/QRPlaceholder.png"
import { Button } from "@/shared/ui/Button";
import { useDevice } from "@/shared/hooks/useDevice";
import { Map } from "@/widgets/Map";

export const ContactsAndDetails = () => {
    const { isMobile } = useDevice()

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[100px] max-md:gap-[50px]"
            role="region"
            aria-label="contacts-details"
        >
            <div className="flex flex-col gap-[40px] max-md:gap-[20px] w-full">
                <Heading level={2}>Контакты и адрес</Heading>
                <div className="flex flex-row max-xl:flex-col-reverse gap-[40px] max-md:gap-[20px] w-full">
                    <div className="flex flex-col gap-[40px] max-md:gap-[20px]">
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={GeoTag} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                            </div>
                            <div className="flex flex-col gap-[16px] w-full">
                                <div className="flex flex-col gap-[8px]">
                                    <h5 className="font-h5 text-accent uppercase">Адрес</h5>
                                    <p className="font-p-lg text-text-primary">МО, п. Заречье, ул. Торговая, д.5, пом. 8</p>
                                </div>
                                <InlineLink text="Построить маршрут" href="https://yandex.ru/maps/1/moscow-and-moscow-oblast/house/torgovaya_ulitsa_5/Z04YcgZhQEICQFtvfXp5cH9gYg==/?from=api-maps&indoorLevel=1&ll=37.412362%2C55.681100&origin=jsapi_3&utm_source=jsapi&z=16.8" openInNewTab className="self-start" />
                            </div>
                        </div>
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={Phone} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
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
                                    {/* <Link to="" target="_blank" rel="noopener noreferrer" aria-label="Instagram клиники">
                                        <Icon Svg={Instagram} width={20} height={20} className="stroke-accent" />
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={Letter} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">Почта</h5>
                                <p className="font-p-lg text-text-primary">clinic@teloiduh.ru</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[32px] w-full">
                            <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                <Icon Svg={Clock} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 text-accent uppercase">График работы</h5>
                                <p className="font-p-lg text-text-primary">Пн-Чт: с 7:30 до 20:00<br/>Пт: с 7:30 до 19:00<br/>Сб-Вс: с 8:00 до 19:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center border border-background-secondary rounded-[5px] bg-gray-100 h-[442px] w-full max-w-[807px]">
                        <Map />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[40px] max-md:gap-[20px] w-full">
                <Heading level={2}>РУКОВОДСТВО клиники</Heading>
                <div className="flex flex-col gap-[40px] max-md:gap-[20px] w-full">
                    <div className="flex flex-row max-xl:flex-col gap-[40px] max-md:gap-[20px] w-full">
                        <div className="flex flex-col gap-[30px] p-[40px] max-md:p-[20px] bg-white border border-background-secondary rounded-[5px] w-full max-w-[652px]">
                            <div className="flex justify-between w-full">
                                <p className="font-lbl-number text-accent uppercase">Генеральный директор</p>
                                <p className="font-lbl-number text-design-elements uppercase">{getFormattedIndex(0)}</p>
                            </div>
                            <div className="flex flex-col justify-between gap-[20px] w-full h-full">
                                <h4 className="font-h4 uppercase text-heading">Ануфриев Егор Николаевич</h4>
                                <div className="flex flex-col gap-[16px]">
                                    <div className="flex flex-row gap-[32px] w-full">
                                        <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                            <Icon Svg={Phone} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                                        </div>
                                        <div className="flex flex-col gap-[8px]">
                                            <h5 className="font-h5 text-accent uppercase">Телефон</h5>
                                            <p className="font-p-lg text-text-primary">+7 (926) 758-92-66</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-[32px] w-full">
                                        <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                            <Icon Svg={Clock} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                                        </div>
                                        <div className="flex flex-col gap-[8px]">
                                            <h5 className="font-h5 text-accent uppercase">График приёма</h5>
                                            <p className="font-p-lg text-text-primary">Пн-Вс по предварительной записи</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[30px] p-[40px] max-md:p-[20px] bg-white border border-background-secondary w-full rounded-[5px] max-w-[652px]">
                            <div className="flex justify-between w-full">
                                <p className="font-lbl-number text-accent uppercase">ГЛАВНЫЙ ВРАЧ</p>
                                <p className="font-lbl-number text-design-elements uppercase">{getFormattedIndex(1)}</p>
                            </div>
                            <div className="flex flex-col justify-between gap-[20px] w-full h-full">
                                <h4 className="font-h4 uppercase text-heading">Ануфриева Наталья Яковлевна</h4>
                                <div className="flex flex-col gap-[16px]">
                                    <div className="flex flex-row gap-[32px] w-full">
                                        <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                            <Icon Svg={Phone}  width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                                        </div>
                                        <div className="flex flex-col gap-[8px]">
                                            <h5 className="font-h5 text-accent uppercase">Телефон</h5>
                                            <p className="font-p-lg text-text-primary">+7 (903) 271-04-48</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-[32px] w-full">
                                        <div className="flex flex-col justify-center items-center rounded-full border border-design-elements w-[64px] h-[64px] max-md:w-[32px] max-md:h-[32px] aspect-square">
                                            <Icon Svg={Clock} width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} className="stroke-design-elements" />
                                        </div>
                                        <div className="flex flex-col gap-[8px]">
                                            <h5 className="font-h5 text-accent uppercase">График приёма</h5>
                                            <p className="font-p-lg text-text-primary">Пн-Вс по предварительной записи </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-[10px] items-center">
                        <Icon Svg={CheckmarkCircle} className="stroke-accent shrink-0" />
                        <p className="font-cap uppercase text-text-primary">Обязательна предварительная запись по телефону.</p>
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col gap-[40px] max-md:gap-[20px] w-full">
                <Heading level={2}>Лицензия клиники</Heading>
                <div className="flex flex-row max-xl:flex-col max-xl:items-center gap-[30px] p-[40px] max-md:p-[20px] bg-white border border-background-secondary rounded-[5px] w-full">
                    <div className="flex flex-col gap-[40px] max-md:gap-[20px] w-full">
                        <h4 className="font-h4 text-heading uppercase">Лицензия на осуществление медицинской деятельности</h4>
                        <div className="grid grid-cols-2 grid-rows-2 max-md:flex max-md:flex-col gap-[20px] w-full">
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 uppercase text-accent">Регистрационный номер лицензии</h5>
                                <p className="font-p-lg text-text-primary">Л041-01137-77/00366420</p>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 uppercase text-accent">Дата получения лицензии</h5>
                                <p className="font-p-lg text-text-primary">12 июля 2026г.</p>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h5 className="font-h5 uppercase text-accent">Лицензирующий орган</h5>
                                <p className="font-p-lg text-text-primary">Департамент здравоохранения города Москвы</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px] items-center max-w-[354px] w-full">
                        <img src={QRPlaceholder} alt="QR-код лицензии" className="aspect-square max-w-[200px] w-full" />
                        <Button theme="default" text="Открыть" className="w-full" />
                    </div>
                </div>
            </div> */}
            <div className="flex flex-col gap-[40px] max-md:gap-[20px] w-full">
                <Heading level={2}>ЮРИДИЧЕСКИЕ РЕКВИЗИТЫ ОРГАНИЗАЦИИ</Heading>
                <div className="flex flex-col gap-[40px] max-xl:gap-[20px] p-[40px] max-md:p-[20px] bg-white border border-background-secondary rounded-[5px] w-full">
                    <div className="flex max-xl:flex-col gap-[40px] max-xl:gap-[20px] xl:justify-between w-full">
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">Наименование организации</h5>
                            <p className="font-p-lg text-text-primary">ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «ТЕЛО И ДУХ»</p>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">ИНН</h5>
                            <p className="font-p-lg text-text-primary">9731160567</p>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">КПП</h5>
                            <p className="font-p-lg text-text-primary">773101001</p>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">ОГРН</h5>
                            <p className="font-p-lg text-text-primary">1267700037582</p>
                        </div>
                    </div>
                    <div className="flex max-xl:flex-col gap-[40px] max-xl:gap-[20px] xl:justify-between w-full">
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">Номер расчетного счета</h5>
                            <p className="font-p-lg text-text-primary">40702810810002052899</p>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">БИК банка</h5>
                            <p className="font-p-lg text-text-primary">044525974</p>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">Корреспондентский счет</h5>
                            <p className="font-p-lg text-text-primary">30101810145250000974</p>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <h5 className="font-h5 uppercase text-accent">Банк</h5>
                            <p className="font-p-lg text-text-primary">АО «ТБанк»</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px] w-full">
                        <h5 className="font-h5 uppercase text-accent">Юридический адрес</h5>
                        <p className="font-p-lg text-text-primary">121595,Россия, г.Москва, ВН.ТЕР.Г. Муниципальный округ Можайский, ул Горбунова, Д.2,Стр.3, Помещ.12/8</p>
                    </div>
                    <div className="flex flex-col gap-[8px] w-full">
                        <h5 className="font-h5 uppercase text-accent">Фактический адрес</h5>
                        <p className="font-p-lg text-text-primary">Московская область, Одинцовский городской округ, посёлок городского типа Заречье, улица Торговая, д.5, этаж: 1, помещение 8</p>
                    </div>
                </div>
            </div>
        </Section>
    );
};
