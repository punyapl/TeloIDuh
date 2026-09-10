import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Page, } from '@/widgets/Page'
import { CalculatorCarousel, Contacts, Directions, FAQ, Hero, NewsCarousel, Philosophy, Tagline } from '@/widgets/PageSections';
import { Helmet } from 'react-helmet-async';

const MainPage = () => {
    const { state } = useLocation();

    useEffect(() => {
        if (state?.scrollTo) {
            setTimeout(() => {
                document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>Тело и дух | клиника превентивной медицины и биохакинга в Подмосковье</title>
                <meta name="description" content="Клиника «Тело и дух» в п. Заречье (МО) — превентивная медицина, биохакинг и программы долголетия. Консультации врачей, чек-апы, УЗИ, капельницы, анализы, педиатрия. Запись: +7 (495) 120-24-17." />
                <meta name="keywords" content="клиника превентивной медицины, биохакинг, долголетие, чек-ап, консультация врача, УЗИ, капельницы, анализы, педиатрия, Заречье, Одинцово, Подмосковье" />
                <link rel="canonical" href="https://teloiduh.ru/" />
            </Helmet>
            <Page>
                <Hero />
                <Tagline />
                <NewsCarousel />
                <Directions />
                <Philosophy />
                <CalculatorCarousel />
                <FAQ />
                <Contacts />
            </Page>
        </>

    )
}

export default MainPage