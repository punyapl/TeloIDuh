import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type QuoteProps<T extends ElementType = 'div'> = {
    text?: string;
    className?: string;
    children?: ReactNode;
    as?: T; // Наш новый проп
} & Omit<ComponentPropsWithoutRef<T>, 'text' | 'className' | 'children' | 'as'>;

export const Quote = <T extends ElementType = 'div'>({
    text,
    className = '',
    children,
    as,
    ...props
}: QuoteProps<T>) => {
    const Component = as || 'div';

    return (
        <Component 
            className={`py-[10px] pl-4 border-l border-accent ${className}`}
            {...props}
        >
            {
                children && !text ?
                    (children)
                    :
                    <p className="font-cap-ital text-heading">{text}</p>
            }
        </Component>
    );
};
