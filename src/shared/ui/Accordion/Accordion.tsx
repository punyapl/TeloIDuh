import { useDevice } from "@/shared/hooks/useDevice";
import { useState, useRef, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AccordionItem {
    id: string;
    index: string;
    title: string;
    shortDesc?: string;
    description?: string;
    image?: string;
    children?: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    /** Allow multiple items open simultaneously. Default: false */
    multiple?: boolean;
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

interface ItemProps {
    item: AccordionItem;
    isOpen: boolean;
    onToggle: () => void;
}

function AccordionRow({ item, isOpen, onToggle }: ItemProps) {
    const { isMobile, } = useDevice()

    const bodyRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!bodyRef.current) return;
        if (isOpen) {
            setHeight(bodyRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isOpen]);

    const contentId = `accordion-body-${item.id}`;

    return (
        <div className="border-b border-design-elements/40">
            {/* ── Trigger row ── */}
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-6 py-8 text-left group transition-colors duration-300 cursor-pointer"
                aria-controls={contentId}
            >
                {/* Index */}
                <span className="font-lbl-number text-text-secondary shrink-0 w-6 text-left select-none">
                    {item.index}
                </span>

                {/* Title */}
                <h3
                    className={[
                        "font-h3 uppercase flex-1 transition-all duration-300",
                        isOpen
                            ? `text-accent ${!isMobile && 'pl-[32px]'}`
                            : `text-heading ${!isMobile && 'group-hover:text-accent group-hover:pl-[32px]'}`,
                    ].join(" ")}
                >
                    {item.title}
                </h3>

                {/* Short description */}
                {item.shortDesc && (
                    <span className="font-cap leading-none uppercase text-text-secondary text-right max-w-[200px] hidden xl:block shrink-0">
                        {item.shortDesc}
                    </span>
                )}

                {/* Toggle button */}
                <div
                    className={[
                        "shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
                        isOpen
                            ? "bg-accent border-accent"
                            : "border-background-secondary bg-background-secondary group-hover:border-accent group-hover:bg-background",
                    ].join(" ")}
                    aria-hidden="true"
                >
                    {isOpen ? (
                        <MinusIcon className="text-background w-4 h-4" />
                    ) : (
                        <PlusIcon
                            className={[
                                "w-4 h-4 transition-colors duration-300",
                                "text-heading group-hover:text-accent",
                            ].join(" ")}
                        />
                    )}
                </div>
            </button>

            {/* ── Expandable body ── */}
            <div
                className="overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ height }}
                aria-labelledby={`accordion-btn-${item.id}`}
            >
                <div ref={bodyRef}>
                    {item.children ? (
                        <div className="pb-12 pt-2">
                            {item.children}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12 pt-2">
                            {item.image && (
                                <div className="overflow-hidden rounded-sm max-w-[647px] max-h-[364px] group bg-background-secondary">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                            )}
                            <div
                                className={[
                                    "flex flex-col justify-center w-full",
                                    !item.image ? "lg:col-span-2" : "lg:max-w-[512px]",
                                ].join(" ")}
                            >
                                <p className="font-p-xl text-text-primary w-full">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Accordion (root) ─────────────────────────────────────────────────────────

export function Accordion({ items, multiple = false }: AccordionProps) {
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
                <AccordionRow
                    key={item.id}
                    item={item}
                    isOpen={openIds.has(item.id)}
                    onToggle={() => toggle(item.id)}
                />
            ))}
        </div>
    );
}

// ─── Inline icon helpers (no external deps) ──────────────────────────────────

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className={className}
            aria-hidden="true"
        >
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
        </svg>
    );
}

function MinusIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className={className}
            aria-hidden="true"
        >
            <line x1="2" y1="8" x2="14" y2="8" />
        </svg>
    );
}

// ─── Usage example ────────────────────────────────────────────────────────────

const DEMO_ITEMS: AccordionItem[] = [
    {
        id: "1",
        index: "01",
        title: "Консультации врачей",
        shortDesc: "Комплексная\nдиагностика всех\nсистем организма",
        description:
            "Глубокое исследование генетического профиля, гормонального фона и дефицитов. Мы составляем индивидуальную карту вашего здоровья.",
        image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80",
    },
    {
        id: "2",
        index: "02",
        title: "Персональное питание",
        shortDesc: "Разработка рациона\nпод ваш\nметаболизм",
        description:
            "На основе лабораторных данных и генетических особенностей составляется персональный план питания, который учитывает все нюансы вашего организма.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    },
    {
        id: "3",
        index: "03",
        title: "Антивозрастные программы",
        description:
            "Комплекс научно обоснованных интервенций, направленных на снижение биологического возраста и повышение качества жизни на долгосрочную перспективу.",
    },
];

export function AccordionDemo() {
    return (
        <div className="bg-background px-6 py-16 max-w-[1344px] mx-auto">
            <Accordion items={DEMO_ITEMS} />
        </div>
    );
}