// shared/ui/PhoneInput.tsx
import MaskedInput from 'react-text-mask';
import { forwardRef } from 'react';

interface PhoneInputProps {
    label: string;
    value: string;
    onChange: (e: any) => void;
    onBlur?: (e: any) => void;
    error?: string;
    placeholder?: string;
    className?: string;
}

export const PhoneInput = forwardRef<HTMLElement, PhoneInputProps>(
    ({ label, value, onChange, onBlur, error, placeholder, className }, ref) => {
        const phoneMask = [
            '+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
        ];

        return (
            <div className={`flex flex-col gap-[6px] ${className || ''}`}>
                {label && (
                    <label className="font-lbl text-accent uppercase">
                        {label}
                    </label>
                )}
                <MaskedInput
                    mask={phoneMask}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    guide={false}
                    className={`min-h-8 grow min-w-0 shrink p-[10px] font-p-sm border-b text-text-primary
                        ${error ? 'border-red-500' : 'border-design-elements'} 
                        focus:border-accent focus:outline-none transition-colors duration-200 ease-in-out
                        placeholder:text-text-secondary
                    `}
                />
                {error && <span className="font-cap text-red-500">{error}</span>}
            </div>
        );
    }
);

PhoneInput.displayName = 'PhoneInput';