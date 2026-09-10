interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupProps {
    name: string;
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const RadioGroup = (props: RadioGroupProps) => {
    const { name, options, value, onChange, className = '' } = props;

    return (
        <div className={`flex gap-[40px] ${className}`}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center gap-[10px] cursor-pointer group"
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                        className="sr-only peer"
                    />
                    <span className="
                        w-[16px] h-[16px] rounded-full border border-design-elements flex items-center justify-center
                        transition-colors duration-150
                        peer-checked:border-accent
                        group-hover:border-accent
                    ">
                        <span className={`
                            w-[10px] h-[10px] rounded-full transition-colors duration-150
                            ${value === option.value ? 'bg-accent' : 'bg-transparent'}
                        `} />
                    </span>
                    <span className="font-p-xs text-text-secondary">{option.label}</span>
                </label>
            ))}
        </div>
    );
};