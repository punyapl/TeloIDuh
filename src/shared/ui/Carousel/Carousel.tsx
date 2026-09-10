import ChevronDown from '@/shared/assets/icons/ChevronDown.svg'
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Icon } from '../Icon';
import { useDevice } from '@/shared/hooks/useDevice';

type CarouselProps<T> = {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    role?: React.AriaRole;
    desktopPageSize: number;
    tabletPageSize: number;
    mobilePageSize: number;
    slideShow?: boolean;
    className?: string;
};

const getVisibleItems = (desktop: number, tablet: number, mobile: number) => {
    if (typeof window === 'undefined') return desktop;
    const width = window.innerWidth;
    if (width >= 1280) return desktop;
    if (width >= 768) return tablet;
    return mobile;
};

export const Carousel = <T,>(props: CarouselProps<T>) => {
    const {
        items,
        renderItem,
        desktopPageSize,
        tabletPageSize,
        mobilePageSize,
        className,
        slideShow = false,
        role
    } = props;
    const { isDesktop, } = useDevice();

    // 1. Состояние видимых элементов
    const [visibleItems, setVisibleItems] = useState(() =>
        getVisibleItems(desktopPageSize, tabletPageSize, mobilePageSize)
    );

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const next = width >= 1280 ? desktopPageSize : width >= 768 ? tabletPageSize : mobilePageSize;
            setVisibleItems(next);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [desktopPageSize, tabletPageSize, mobilePageSize]);

    // 2. Инициализация Embla
    const plugins = slideShow ? [Autoplay({ delay: 4000, stopOnInteraction: true })] : [];
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            align: 'start',
            slidesToScroll: visibleItems, // Прокручиваем по количеству видимых слайдов
        },
        plugins
    );

    // 3. Состояние для навигации (точки и кнопки)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onInit = useCallback((api: any) => {
        setScrollSnaps(api.scrollSnapList());
    }, []);

    const onSelect = useCallback((api: any) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on('reInit', onInit);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);
    }, [emblaApi, onInit, onSelect]);

    return (
        <div
            className={`relative mx-auto max-w-[1248px] max-xl:max-w-[682px] max-md:max-w-full ${className || ''}`}
            role={role}
        >
            <div className="flex items-center gap-5 max-md:gap-2.5">

                {/* Кнопка Назад */}
                {
                    isDesktop &&
                    <button
                        onClick={scrollPrev}
                        aria-label="Previous slide"
                        className="flex items-center justify-between p-[12px] text-left group cursor-pointer"
                    >
                        <div
                            className="shrink-0 w-[40px] h-[40px] rounded-full border flex items-center justify-center transition-all duration-300 border-design-elements group-hover:border-accent"
                            aria-hidden="true"
                        >
                            <Icon
                                Svg={ChevronDown}
                                width={16}
                                height={16}
                                className="rotate-90 stroke-accent transition-all duration-300 text-text-secondary group-hover:text-accent"
                            />
                        </div>
                    </button>
                }

                {/* Контейнер карусели */}
                <div className="overflow-hidden w-full" ref={emblaRef}>
                    <div className="flex touch-pan-y -ml-[12px]">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                // Динамически задаем ширину слайда в зависимости от visibleItems
                                style={{ flex: `0 0 calc(${100 / visibleItems}% - 12px)` }}
                                className="min-w-0 pl-[12px]"
                            >
                                <div className="flex justify-center overflow-visible w-full h-full">
                                    {renderItem(item, index)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Кнопка Вперед */}
                {
                    isDesktop &&
                    <button
                        onClick={scrollNext}
                        aria-label="Next slide"
                        className="flex items-center justify-between p-[12px] text-left group cursor-pointer"
                    >
                        <div
                            className="shrink-0 w-[40px] h-[40px] rounded-full border flex items-center justify-center transition-all duration-300 border-design-elements group-hover:border-accent"
                            aria-hidden="true"
                        >
                            <Icon
                                Svg={ChevronDown}
                                width={16}
                                height={16}
                                className="-rotate-90 stroke-accent transition-all duration-300 text-text-secondary group-hover:text-accent"
                            />
                        </div>
                    </button>
                }
            </div>

            {/* Пагинация (Точки) */}
            <div className="flex justify-center mt-5 max-md:mt-3 w-full">
                <div className="flex gap-5 max-md:gap-3">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === selectedIndex ? 'bg-accent' : 'bg-background-secondary'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};