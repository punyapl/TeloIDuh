import { ReactNode } from "react";

interface HeadingProps {
    subtitle?: string;
    level?: 1 | 2;
    children: ReactNode | ReactNode[];
}

export const Heading = (props: HeadingProps) => {
    const { subtitle, level = 1, children } = props;

    switch (level) {
        case 1:
            return (
                <div className="flex flex-col gap-[24px] items-start">
                    {subtitle && <p className="font-lbl text-accent uppercase">{subtitle}</p>}
                    <h1 className="font-h1 text-heading uppercase">{children}</h1>
                </div>
            );
        case 2:
            return (
                <div className="flex flex-row gap-[10px] justify-between items-end">
                    <h2 className="font-h2 text-heading uppercase">{children}</h2>
                    {subtitle && <p className="max-md:hidden font-cap-ital text-text-secondary uppercase text-right">{subtitle}</p>}
                </div>
            );
    }
};
