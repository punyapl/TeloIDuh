import { InputHTMLAttributes, forwardRef } from 'react';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string;
    className?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const {
        label,
        required,
        onChange,
        error,
        className,
        value,
        defaultValue,
        ...inputProps // Все остальные стандартные пропсы input
    } = props;

    return (
        <div className={`flex flex-col gap-[6px] ${className}`}>
            {label && (
                <label htmlFor={inputProps.id} className="font-lbl text-accent uppercase">
                    {label}{required && ' *'}
                </label>
            )}
                <input
                    ref={ref}
                    className={`min-h-8 grow min-w-0 shrink p-[10px] font-p-sm border-b text-text-primary
                        ${error ? 'border-red-500' : 'border-design-elements'} 
                        focus:border-accent focus:outline-none transition-colors duration-200 ease-in-out
                        placeholder:text-text-secondary`}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={e => {
                        onChange?.(e);
                    }}
                    {...inputProps} // Все стандартные HTML атрибуты
                />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
});