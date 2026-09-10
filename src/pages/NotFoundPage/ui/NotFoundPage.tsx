import { Link } from "react-router-dom";
import { Section } from "@/shared/ui/Section";
import { Page } from "@/widgets/Page";
import { Icon } from "@/shared/ui/Icon";
import ArrowRight from "@/shared/assets/icons/ArrowRight.svg";
import { Button } from "@/shared/ui/Button";

const NotFoundPage = () => {
    return (
        <Page>
            <Section
                SectionClassName="grow flex items-center py-[100px] max-xl:py-[50px] px-[48px] max-md:px-[24px]"
                ContainerClassName="flex flex-col items-center text-center gap-[24px]"
                role="region"
                aria-label="404-heading"
            >
                <p className="font-lbl text-accent uppercase">Ошибка 404</p>
                <h1 className="font-h1 text-heading uppercase">
                    Страница<br /><span className="text-accent">не найдена</span>
                </h1>
                <p className="font-p-md text-text-secondary max-w-[480px]">
                    Возможно, страница была перемещена или удалена. 
                    Проверьте адрес или вернитесь на главную.
                </p>
                <Link
                    to="/"
                >
                    <Button theme="default" text="на главную" icon={ArrowRight} />
                </Link>
            </Section>
        </Page>
    );
};

export default NotFoundPage;