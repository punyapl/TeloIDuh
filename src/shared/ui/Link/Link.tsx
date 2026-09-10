import { Icon } from "../Icon";
import ArrowLeft from '@/shared/assets/icons/ArrowLeft.svg'

interface LinkProps {
    text: string;
    href?: string;
    onClick?: () => void;
    className?: string;
    openInNewTab?: boolean;
    rel?: string;
}

export const Link = (props: LinkProps) => {
    const { text, href, onClick, className = '', openInNewTab = true, rel } = props

    return (
        <a
            href={href}
            onClick={onClick}
            target={openInNewTab ? '_blank' : undefined}
            rel={rel || (openInNewTab ? 'noopener noreferrer' : undefined)}
            title={text}
            className={`group font-btn-xs text-accent uppercase border-b border-accent flex flex-row pb-[4px] ${className}`}
        >
            <Icon
                Svg={ArrowLeft}
                width={16}
                height={16}
                className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:mr-[10px] transition-all duration-300 stroke-accent"
            />
            {text}
        </a>
    );
};
