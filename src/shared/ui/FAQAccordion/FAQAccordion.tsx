import { useDevice } from "@/shared/hooks/useDevice";
import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    /** Allow multiple items open simultaneously. Default: false */
    multiple?: boolean;
}

// ─── FAQAccordionRow ──────────────────────────────────────────────────────────

interface RowProps {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}

function FAQAccordionRow({ item, isOpen, onToggle }: RowProps) {
    const { isMobile, } = useDevice()

    const bodyRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!bodyRef.current) return;
        setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }, [isOpen]);

    return (
        <div
            className={[
                "border-b border-design-elements/40 transition-colors duration-300",
                isOpen ? "bg-background-secondary" : "bg-transparent",
            ].join(" ")}
        >
            {/* ── Trigger ── */}
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-[40px] text-left group cursor-pointer"
            >
                <span
                    className={[
                        "font-h4 font-heading uppercase transition-all duration-300 pr-4",
                        isOpen
                            ? `text-accent ${!isMobile && 'pl-[20px]'} `
                            : `text-heading ${!isMobile && 'group-hover:text-accent group-hover:pl-[20px]'}`,
                    ].join(" ")}
                >
                    {item.question}
                </span>

                <div
                    className={[
                        "shrink-0 w-[40px] h-[40px] rounded-full border flex items-center justify-center transition-all duration-300",
                        isOpen
                            ? "bg-accent border-accent"
                            : "border-design-elements group-hover:border-accent",
                    ].join(" ")}
                    aria-hidden="true"
                >
                    <ChevronIcon
                        className={[
                            "w-[16px] h-[16px] transition-all duration-300",
                            isOpen
                                ? "text-background rotate-180"
                                : "text-text-secondary group-hover:text-accent",
                        ].join(" ")}
                    />
                </div>
            </button>

            {/* ── Body ── */}
            <div
                className="overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ height }}
            >
                <div ref={bodyRef}>
                    <p className="font-p-md text-text-primary px-[40px] pb-[40px] w-full whitespace-pre-line">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ─── FAQAccordion (root) ──────────────────────────────────────────────────────

export function FAQAccordion({ items, multiple = false }: FAQAccordionProps) {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());

    const toggle = (id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                if (!multiple) next.clear();
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="border-t border-design-elements/40">
            {items.map((item) => (
                <FAQAccordionRow
                    key={item.id}
                    item={item}
                    isOpen={openIds.has(item.id)}
                    onToggle={() => toggle(item.id)}
                />
            ))}
        </div>
    );
}

// ─── Inline chevron icon ──────────────────────────────────────────────────────

function ChevronIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <polyline points="3,6 8,11 13,6" />
        </svg>
    );
}

// ─── Usage example ────────────────────────────────────────────────────────────

const DEMO_ITEMS: FAQItem[] = [
    {
        id: "1",
        question: "Как записаться к врачу?",
        answer:
            "Вы можете написать в удобный для Вас Мессенджер / позвонить нам / оставить заявку на сайте и мы подберём удобное для Вас время для записи.",
    },
    {
        id: "2",
        question: "Какие анализы нужно сдать перед визитом?",
        answer:
            "Список необходимых анализов зависит от цели визита. Для первичной консультации достаточно общего анализа крови и мочи. Врач направит на дополнительные исследования при необходимости.",
    },
    {
        id: "3",
        question: "Как долго длится первичная консультация?",
        answer:
            "Первичная консультация занимает от 45 до 60 минут. За это время врач собирает анамнез, проводит осмотр и составляет план обследования.",
    },
];

export function FAQAccordionDemo() {
    return (
        <div className="bg-background min-h-screen px-6 py-16 max-w-2xl mx-auto">
            <FAQAccordion items={DEMO_ITEMS} />
        </div>
    );
}