import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/shared/ui/NavBar';
import { Button } from '@/shared/ui/Button';
import { useDevice } from '@/shared/hooks/useDevice';
import Burger from '@/shared/assets/icons/Burger.svg';
import XMarkIcon from '@/shared/assets/icons/XMark.svg';
import Logo from '@/shared/assets/images/Logo.png';
import PaperPlane from '@/shared/assets/icons/PaperPlane.svg'
import { Icon } from '@/shared/ui/Icon';
import { Section } from '@/shared/ui/Section';
import { createPortal } from 'react-dom';
import { AccessibilityButton } from '@/features/accessibility';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isMobile, isDesktop } = useDevice();

    const isHomePage = window.location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Закрываем мобильное меню при переходе на десктоп
    useEffect(() => {
        if (isDesktop) setSidebarOpen(false);
    }, [isDesktop]);

    // Блокируем скролл при открытом мобильном меню
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    return (
        <>
            <Section
                SectionClassName={`fixed left-0 right-0 w-full z-50 
                ${isScrolled ?
                        'bg-background/75 backdrop-blur-md border-b border-design-elements' :
                        `bg-transparent 
                            ${isHomePage ? 'backdrop-blur-xs' : ''} 
                        border-b border-transparent`} 
                    transition-all duration-500`
                }
                ContainerClassName='w-full max-w-[1440px]'
            >
                <header
                    className="px-6 md:px-[48px] py-[20px] flex flex-row w-full items-center justify-between"
                >

                    {/* Логотип */}
                    <div className="flex items-center gap-[24px]">
                        {isHomePage ? (
                            <span className="flex items-center gap-3 shrink-0">
                                <img src={Logo} alt="Тело и дух" className="w-[73px] h-[50px]" />
                            </span>
                        ) : (
                            <Link to="/" className="flex items-center gap-3 shrink-0">
                                <img src={Logo} alt="Тело и дух" className="w-[73px] h-[50px]" />
                            </Link>
                        )}
                        <div className="max-md:hidden flex flex-col items-center gap-[4px]">
                            <Link to="tel:+74951202417" className="text-heading hover:text-accent transition-colors duration-300 font-heading text-[16px] leading-normal tracking-[2px]" aria-label="Позвонить нам">
                                +7 (495) 120-24-17
                            </Link>
                            <p className="uppercase font-heading text-accent text-[8px] leading-normal tracking-[2px]">
                                Ждем вашего звонка
                            </p>
                        </div>
                    </div>

                    {/* Навбар — только десктоп */}
                    {isDesktop && (
                        <NavBar className="flex gap-6 items-center" />
                    )}

                    {/* Правая часть */}
                    <div className="flex items-center gap-4 shrink-0">
                        {/* {isDesktop && (
                            <Button
                                theme="default"
                                size="small"
                                text="Записаться"
                                onClick={() => {}}
                            />
                        )} 
                        */}
                        <Link to="https://t.me/tidclinic" target="_blank" rel="noopener noreferrer" aria-label="Telegram-канал клиники">
                            <Button theme='default' icon={PaperPlane} size='small'/>
                        </Link>
                        <AccessibilityButton />

                        {/* Бургер — только мобайл */}
                        {!isDesktop && (
                            <button
                                className="p-2 cursor-pointer"
                                onClick={() => setSidebarOpen(prev => !prev)}
                                aria-label={sidebarOpen ? 'Закрыть меню' : 'Открыть меню'}
                                aria-expanded={sidebarOpen}
                                aria-controls="mobile-menu"
                            >
                                <Icon
                                    Svg={sidebarOpen ? XMarkIcon : Burger}
                                    width={24}
                                    height={24}
                                    className="stroke-heading"
                                />
                            </button>
                        )}
                    </div>
                </header>
            </Section>
            {createPortal(
                <>
                    {/* Оверлей */}
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/30 z-40 top-[90px]"
                                onClick={() => setSidebarOpen(false)}
                                aria-hidden="true"
                                role="presentation"
                            />
                        )}
                    </AnimatePresence>

                    {/* Мобильное меню */}
                    <div
                        id="mobile-menu"
                        className={`
                            fixed inset-y-0 right-0 z-50 bg-background
                            ${isMobile ? 'w-screen' : 'max-w-[360px]'} top-[90px]
                            transform transition-transform duration-300 ease-in-out
                            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                        `}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Мобильное меню"
                        aria-hidden={!sidebarOpen}
                    >
                        <nav
                            className="flex flex-col h-full justify-between px-[38px] py-[34px]"
                            aria-label="Мобильная навигация"
                        >
                            <NavBar
                                className="flex-col items-start gap-[30px]"
                                role="navigation"
                            />
                            {/* <Button
                                theme="default"
                                size="regular"
                                text="Записаться"
                                className="w-full"
                                onClick={() => {
                                    setSidebarOpen(false);
                                }}
                            /> */}
                        </nav>
                    </div>
                </>,
                document.body
            )}
        </>
    );
};