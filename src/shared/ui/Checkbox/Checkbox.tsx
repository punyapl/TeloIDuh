import { InputHTMLAttributes, ReactNode, forwardRef, } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelNode?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, labelNode, className = '', ...props }, ref) => {
        return (
            <label className={`inline-flex gap-[10px] items-center cursor-pointer group ${className}`}>
                <input
                    ref={ref}
                    type="checkbox"
                    className="sr-only"
                    {...props}
                />
                <div className={`
                    w-[16px] h-[16px] flex items-center justify-center
                    border rounded-[5px]
                    transition-colors duration-200 ease-in-out shrink-0
                    group-hover:border-accent
                    ${props.checked ? 'bg-accent border-accent' : 'bg-background border-design-elements'}
                    ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    {props.checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="square"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>

                {labelNode ? (
                    <span className="font-p-xs text-text-secondary">{labelNode}</span>
                ) : label ? (
                    <span className="font-p-xs text-text-secondary">{label}</span>
                ) : null}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';