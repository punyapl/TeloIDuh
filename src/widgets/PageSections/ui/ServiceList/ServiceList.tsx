import { MOCK_SERVICES } from "@/shared/const/mockServices";
import { Accordion } from "@/shared/ui/Accordion";
import { SearchInput } from "@/shared/ui/SearchInput";
import { Section } from "@/shared/ui/Section";
import { ServiceCard } from "@/widgets/ServiceCard";

import { useState, useMemo } from "react";

export const ServiceList = () => {
    const [search, setSearch] = useState("");

    const normalizedSearch = search.trim().toLowerCase();

    const filteredCards = useMemo(() => {
        if (!normalizedSearch) return [];
        return MOCK_SERVICES.flatMap((service) =>
            service.cards.filter((card) =>
                card.title.toLowerCase().includes(normalizedSearch)
            )
        );
    }, [normalizedSearch]);

    const isSearching = normalizedSearch.length > 0;

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="service-list"
        >
            <SearchInput
                className="self-start max-w-[468px]"
                placeholder="Поиск услуги..."
                onChange={setSearch}
            />

            {isSearching ? (
                filteredCards.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] max-md:gap-[16px]">
                        {filteredCards.map((card, i) => (
                            <div key={card.id} className="flex items-center justify-center">
                                <ServiceCard
                                    category={card.category}
                                    index={String(i + 1).padStart(2, "0")}
                                    title={card.title}
                                    duration={card.duration}
                                    price={card.price}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="font-p-md text-text-secondary text-center">
                        Ничего не найдено
                    </p>
                )
            ) : (
                <Accordion
                    items={MOCK_SERVICES.map((item) => ({
                        id: item.id,
                        index: item.index,
                        title: item.title,
                        shortDesc: item.shortDesc,
                        children: (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] max-md:gap-[16px]">
                                {item.cards.map((card, i) => (
                                    <div key={card.id} className="flex items-center justify-center">
                                        <ServiceCard
                                            category={card.category}
                                            index={String(i + 1).padStart(2, "0")}
                                            title={card.title}
                                            duration={card.duration}
                                            price={card.price}
                                        />
                                    </div>
                                ))}
                            </div>
                        ),
                    }))}
                />
            )}
        </Section>
    );
};