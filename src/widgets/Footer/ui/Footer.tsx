import { Section } from "@/shared/ui/Section"
import Logo from '@/shared/assets/images/Logo.png'
import { Link } from "react-router";
import { Icon } from "@/shared/ui/Icon";
import Instagram from '@/shared/assets/icons/Instagram.svg'
import PaperPlane from '@/shared/assets/icons/PaperPlane.svg'
import GeoTag from '@/shared/assets/icons/GeoTag.svg'
import Phone from '@/shared/assets/icons/Phone.svg'
import Letter from '@/shared/assets/icons/Letter.svg'
import Clock from '@/shared/assets/icons/Clock.svg'
import { getRouteContacts, getRouteControlOrganizations, getRouteDepressionScale, getRouteDocuments, getRouteHeartHealthCalc, getRouteNews, getRoutePromotions, getRouteServices, getRouteSpecialists, getRouteStopBangQuiz, getRouteVacancies } from "@/shared/const/router";

export const Footer = () => {
    return (
        <Section
            SectionClassName="self-end bg-background-secondary"
            ContainerClassName='w-full max-w-[1440px]'
        >
            <footer
                role="contentinfo"
                aria-label="Подвал сайта"
                className="flex flex-col w-full px-[48px] max-xl:px-[34px] 
                    pt-[100px] pb-[40px] max-xl:py-5 gap-2.5 max-xl:gap-[24px]"
            >
                <div className="flex flex-row max-xl:flex-wrap max-md:flex-col gap-[48px] max-xl:gap-[24px] w-full">
                    {/* clinic description */}
                    <div className="flex flex-col gap-[31px] w-full max-w-[300px]">
                        <div className="flex flex-row gap-[16px] items-center w-full">
                            <img src={Logo} alt="Тело и дух" className="w-[73px] h-[50px]" />
                            <h4 className="font-h4 text-heading leading-[24px] tracking-[1px] uppercase">Тело и дух</h4>
                        </div>
                        <p className="font-p-xs text-text-primary text-[11px] uppercase leading-normal w-full text-wrap">Мы объединяем передовые технологии<br />превентивной медицины и философию<br />осознанного отношения к своему<br />здоровью.</p>
                        <div className="flex flex-row gap-[16px] w-full">
                            {/* <Link to="/instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram клиники">
                                <Icon Svg={Instagram} width={20} height={20} />
                            </Link> */}
                            <Link to="https://t.me/tidclinic" target="_blank" rel="noopener noreferrer" aria-label="Telegram-канал клиники">
                                <Icon Svg={PaperPlane} width={20} height={20} />
                            </Link>
                        </div>
                    </div>

                    {/* clinic info */}
                    <div className="flex flex-col gap-[12px] w-full max-w-[300px]">
                        {/* address */}
                        <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                            <Icon Svg={GeoTag} width={20} height={20} className="stroke-text-secondary" />
                            <div className="flex flex-col items-start w-full">
                                <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">Адрес</h6>
                                <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">МО, п. Заречье, ул. Торговая, д.5</p>
                            </div>
                        </div>
                        {/* phone */}
                        <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                            <Icon Svg={Phone} width={20} height={20} className="stroke-text-secondary" />
                            <div className="flex flex-col items-start w-full">
                                <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">Телефон</h6>
                                <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">+7 (495) 120-24-17</p>
                            </div>
                        </div>
                        {/* email */}
                        <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                            <Icon Svg={Letter} width={20} height={20} className="stroke-text-secondary" />
                            <div className="flex flex-col items-start w-full">
                                <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">Почта</h6>
                                <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">clinic@teloiduh.ru</p>
                            </div>
                        </div>
                        {/* working hours */}
                        <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                            <Icon Svg={Clock} width={20} height={20} className="stroke-text-secondary" />
                            <div className="flex flex-col items-start w-full">
                                <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">График работы</h6>
                                <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">Пн-Чт: с 7:30 до 20:00<br />Пт: с 7:30 до 19:00<br />Сб-Вс: с 8:00 до 19:00</p>
                            </div>
                        </div>
                    </div>

                    {/* sitemap */}
                    <div className="flex flex-col gap-[24px] w-full max-w-[300px]">
                        <h5 className="font-h5 text-[16px] text-accent uppercase">Карта сайта</h5>
                        <div className="flex flex-col gap-[12px]">
                            <Link to={getRouteServices()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Услуги</Link>
                            <Link to={getRouteSpecialists()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Специалисты</Link>
                            <Link to={getRoutePromotions()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Акции и скидки</Link>
                            <Link to={getRouteNews()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Новости и статьи</Link>
                            <Link to={getRouteContacts()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Контакты</Link>
                        </div>
                    </div>

                    {/* services */}
                    {/* <div className="flex flex-col gap-[24px] w-full max-w-[300px]">
                        <h5 className="font-h5 text-[16px] text-accent uppercase">Услуги</h5>
                        <div className="flex flex-col gap-[12px]">
                            <Link to={getRouteServices()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Приёмы врачей</Link>
                            <Link to={getRouteServices()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Капельницы</Link>
                            <Link to={getRouteServices()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">УЗИ диагностика</Link>
                            <Link to={getRouteServices()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Анализы</Link>
                            <Link to={getRouteServices()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Педиатрия</Link>
                            <Link to={getRouteServices()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Чек-апы</Link>
                        </div>
                    </div> */}

                    {/* useful links */}
                    <div className="flex flex-col gap-[24px] w-full max-w-[300px]">
                        <h5 className="font-h5 text-[16px] text-accent uppercase">Полезное</h5>
                        <div className="flex flex-col gap-[12px]">
                            <Link to={getRouteHeartHealthCalc()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Калькулятор здоровья</Link>
                            <Link to={getRouteStopBangQuiz()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Опросник STOP-BANG</Link>
                            <Link to={getRouteDepressionScale()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Шкала депрессии Бека</Link>
                            <Link to={getRouteDocuments()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Документы</Link>
                            <Link to={getRouteControlOrganizations()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Контролирующие организации</Link>
                            <Link to={getRouteVacancies()} className="font-p-xs text-[14px] text-text-primary h-[20px] py-[2px]">Вакансии</Link>
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-row max-xl:flex-col gap-[48px] max-xl:gap-[24px] max-md:gap-2.5 w-full py-[32px]">
                    <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                        <Icon Svg={GeoTag} width={20} height={20} className="stroke-text-secondary" />
                        <div className="flex flex-col items-start w-full">
                            <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">Адрес</h6>
                            <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">МО, п. Заречье, ул. Торговая, д.5</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                        <Icon Svg={Phone} width={20} height={20} className="stroke-text-secondary" />
                        <div className="flex flex-col items-start w-full">
                            <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">Телефон</h6>
                            <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">+7 (495) 120-24-17</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                        <Icon Svg={Letter} width={20} height={20} className="stroke-text-secondary" />
                        <div className="flex flex-col items-start w-full">
                            <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">Почта</h6>
                            <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">clinic@teloiduh.ru</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[12px] items-center w-full max-w-[300px]">
                        <Icon Svg={Clock} width={20} height={20} className="stroke-text-secondary" />
                        <div className="flex flex-col items-start w-full">
                            <h6 className="font-h6 text-[10px] leadnig-normal tracking-[1px] text-accent uppercase">График работы</h6>
                            <p className="font-p-xs text-[14px] leading-[20px] text-text-primary">Пн-Вс: 7:00 - 19:00</p>
                        </div>
                    </div>
                </div> */}
                <div className="flex flex-col gap-[10px] w-full">
                    <p className="font-cap text-text-secondary uppercase w-full text-wrap">Имеются противопоказания. Необходима консультация специалиста!</p>
                    <p className="font-p-xs text-text-secondary w-full text-wrap leading-snug">Материалы, размещенные на сайте, носят информационный характер. Посетители сайта не должны использовать их в качестве медицинских рекомендаций - определение диагноза и выбор методики лечения остается исключительной прерогативой вашего лечащего врача!</p>
                    <p className="font-p-xs text-text-secondary w-full text-wrap leading-snug">Администрация клиники прилагает все усилия для своевременного обновления прейскуранта на сайте, но рекомендует уточнять стоимость услуг в регистратуре или обратиться в колл-центр по телефону +7 (495) 120-24-17.</p>
                    <p className="font-p-xs text-text-secondary w-full text-wrap leading-snug">Обратите внимание: размещенный прейскурант не является офертой, медицинские услуги предоставляются на основании заключенного договора.</p>
                    <p className="font-p-xs text-text-secondary w-full text-wrap leading-snug">Веб-сайт находится в стадии разработки</p>
                </div>
                <div className="flex flex-col w-full pt-[33px] border-t border-text-secondary uppercase">
                    <div className="relative flex flex-row max-md:flex-col max-md:gap-[16px] max-md:text-center w-full items-center">
                        <p className="font-p-xs text-[11px] leading-[16px] tracking-[1px] text-text-secondary text-left">
                            © {new Date().getFullYear()} Тело и дух. Все права защищены.
                        </p>
                        <Link to="https://dx-webs.ru/" target="_blank" rel="noopener noreferrer" className="hidden xl:block absolute left-1/2 -translate-x-1/2 font-p-xs text-[11px] leading-[16px] tracking-[1px] text-text-secondary text-center">
                            Сделано в Dextra Webs
                        </Link>
                        <div className="flex flex-col gap-[16px] items-end max-md:items-center md:ml-auto">
                            <Link
                                to="https://api.teloiduh.ru/uploads/privacy_policy_f0272bf9c3.pdf"
                                className="font-p-xs max-md:text-center text-[11px] leading-[16px] tracking-[1px] text-text-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Политика обработки персональных данных
                            </Link>
                            <Link
                                to="https://api.teloiduh.ru/uploads/confidentiality_regulation_f5db9634b0.pdf"
                                className="font-p-xs max-md:text-center text-[11px] leading-[16px] tracking-[1px] text-text-secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Положение о конфиденциальной информации
                            </Link>
                        </div>
                    </div>
                    <Link to="https://dx-webs.ru/" target="_blank" rel="noopener noreferrer" className="xl:hidden font-p-xs text-[11px] leading-[16px] tracking-[1px] text-text-secondary text-center mt-[16px]">
                        Сделано в Dextra Webs
                    </Link>
                </div>
            </footer>
        </Section>
    );
};
