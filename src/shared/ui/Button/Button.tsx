import { ButtonHTMLAttributes, FC, type SVGProps, } from 'react'
import { Icon, } from '../Icon'
import { useDevice } from '@/shared/hooks/useDevice';

interface ButtonPropsI extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: FC<SVGProps<SVGSVGElement>>;
    iconType?: 'stroke' | 'fill' | 'both';
    theme: 'default' | 'light';
    size?: 'regular' | 'small';
}

export const Button = (props: ButtonPropsI) => {
    const {
        text,
        icon,
        iconType = 'stroke',
        theme,
        size = 'regular',
    } = props;

    const { isMobile, } = useDevice();

    const themeClass = () => {
        let result
        switch (theme) {
            case 'light':
                result = 'bg-background-secondary hover:bg-background hover:outline-1 outline-accent text-heading hover:text-accent stroke-heading hover:stroke-accent'
                break
            case 'default':
                result = 'bg-accent text-background stroke-background hover:bg-heading'
                break
            default:
                break
        }
        return result
    }

    const sizeClass = () => {
        let result
        switch (size) {
            case 'regular':
                result = isMobile ? 'py-[12px] px-[30px] font-btn-xs' : 'py-[20px] px-[40px] font-btn-sm'
                break
            case 'small':
                result = 'py-[12px] px-[30px] font-btn-xs'
                break
            default:
                break
        }
        return result
    }

    const IconClass = () => {
        let sizeResult
        let themeResult
        switch (theme) {
            case 'default':
                themeResult = iconType === 'stroke' ?
                    'stroke-background' :
                    iconType === 'fill' ?
                        'fill-background' :
                        'stroke-background fill-background'
                break
            case 'light':
                themeResult = iconType === 'stroke' ?
                    'stroke-heading group-hover:stroke-accent' :
                    iconType === 'fill' ?
                        'fill-heading group-hover:fill-accent' :
                        'stroke-heading group-hover:stroke-accent fill-heading group-hover:fill-accent'
                break
            default:
                break
        }
        switch (size) {
            case 'regular':
                sizeResult = iconType === 'stroke' || 'both' ? 'stroke-[1.33]' : null
                break
            case 'small':
                sizeResult = iconType === 'stroke' || 'both' ? 'stroke-1' : null
                break
            default:
                break
        }
        return `${themeResult} ${sizeResult}`
    }

    return (
        <button
            className={`
                flex items-center justify-center gap-[16px] cursor-pointer group transition duration-500 rounded-[5px] uppercase
                ${themeClass()} ${sizeClass()} ${props.className} ${props.disabled && 'opacity-30 cursor-not-allowed'}
            `}
            onClick={props.onClick}
            disabled={props.disabled}
            role={props.role}
        >
            {text}
            {
                icon &&
                <Icon Svg={icon} className={IconClass()} />
            }
        </button>
    )
}