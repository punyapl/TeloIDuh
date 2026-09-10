import { getDocuments } from "@/entities/Document/api/document";
import { DocumentGroup } from "@/entities/Document/types";
import { getFormattedIndex } from "@/shared/lib/getFormattedIndex";
import { Accordion } from "@/shared/ui/Accordion";
import { Loader } from "@/shared/ui/Loader";
import { Section } from "@/shared/ui/Section";
import { DocumentCard } from "@/widgets/DocumentCard";
import { useEffect, useState } from "react";

export const DocumentList = () => {
    const [documents, setDocuments] = useState<DocumentGroup[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getDocuments()
            .then(({ data }) => {
                setDocuments(data);
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Section
            SectionClassName="pb-[100px] max-xl:pb-[50px] px-[48px] max-md:px-[24px]"
            ContainerClassName="flex flex-col gap-[60px] max-md:gap-[40px]"
            role="region"
            aria-label="document-list"
        >
            {
                isLoading ?
                    <Loader />
                    : documents &&
                    <Accordion
                        items={documents.map((item, index) => ({
                            id: item.id,
                            index: getFormattedIndex(index),
                            title: item.title,
                            children: (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] max-md:gap-[16px]">
                                    {item.cards.map((card, i) => (
                                        <div className="flex items-center justify-center" key={i}>
                                            <DocumentCard
                                                data={card}
                                                index={getFormattedIndex(i)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ),
                        }))}
                    />
            }

        </Section>
    );
};
