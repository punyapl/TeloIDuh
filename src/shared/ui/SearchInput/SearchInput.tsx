import { useState } from "react";

interface SearchInputProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
    className?: string;
}

export const SearchInput = ({
    placeholder = "Поиск...",
    onSearch,
    onChange,
    className = '',
}: SearchInputProps) => {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSearch?.(value);
    };

    return (
        <div className={`flex items-center gap-[12px] px-[20px] py-[20px] bg-background-secondary rounded-[5px] w-full ${className}`}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="
                    flex-1 bg-transparent outline-none
                    font-p-sm text-text-primary
                    placeholder:text-text-secondary
                "
            />
            <button
                onClick={() => onSearch?.(value)}
                className="shrink-0 text-text-secondary hover:text-accent transition-colors duration-300 cursor-pointer"
                aria-label="Поиск"
            >
                <SearchIcon />
            </button>
        </div>
    );
};

function SearchIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="7" cy="7" r="5" />
            <line x1="11" y1="11" x2="15" y2="15" />
        </svg>
    );
}