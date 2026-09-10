import { Section } from "@/shared/ui/Section";
import HeroVideo from "@/shared/assets/videos/Hero.mp4";
import MobileHeroVideo from "@/shared/assets/videos/HeroMobile.mp4";
import { Quote } from "@/shared/ui/Quote";
import { Button } from "@/shared/ui/Button";
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg";
import { useDevice } from "@/shared/hooks/useDevice";
import { useScrollToSection } from "@/shared/hooks/useScrollToSection/useScrollToSection";

export const Hero = () => {
    const { isMobile } = useDevice();
    const scrollToSection = useScrollToSection();

    return (
        <Section
            SectionClassName="h-full bg-background-secondary"
            ContainerClassName='relative flex flex-col items-center max-w-screen overflow-x-hidden relative'
            role="region"
            aria-label="Приветственный раздел"
        >
            <div className="absolute h-full flex flex-col gap-4 items-center justify-end pt-[90px] pb-[48px] px-[48px] w-full z-10">
                <div className="flex flex-row max-md:flex-col justify-between items-center gap-4 w-full max-w-[1440px]">
                    <Quote text="КЛИНИКА ПРЕВЕНТИВНОЙ МЕДИЦИНЫ И БИОХАКИНГА. МЫ ПРОЕКТИРУЕМ ВАШЕ ДОЛГОЛЕТИЕ." className="md:max-w-[320px] font-sans" as="h1" />
                    <Button theme="default" text="оставить заявку" icon={ArrowRight} onClick={() => scrollToSection("contacts")}/>
                </div>
            </div>
            {/* <div> */}
                <video
                    key={isMobile ? 'mobile' : 'desktop'}
                    src={isMobile ? MobileHeroVideo : HeroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    x-webkit-airplay="deny"
                    className="w-screen max-w-[1920px] relative object-cover max-h-screen max-md:h-screen"
                />
            {/* </div> */}
        </Section>
    );
};
