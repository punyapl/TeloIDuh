import { ReactNode, useEffect, } from 'react'
import { Footer, } from '@/widgets/Footer'
import { Header, } from '@/widgets/Header'
import { CookieBanner } from '@/features/CookieBanner';

type PageProps = {
    children: ReactNode;
}
export const Page = (props: PageProps) => {
    const { children, } = props
    const isHomePage = window.location.pathname === '/';

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div className="flex flex-col items-center min-h-screen bg-background">
            <Header />
            <div className={`flex flex-col w-full grow ${isHomePage ? '' : 'pt-[90px]'}`}>{children}</div>
            <Footer />
            <CookieBanner />
        </div>
    )
}