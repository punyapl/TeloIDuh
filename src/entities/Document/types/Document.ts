export interface DocumentCard {
    category: string;
    title: string;
    date: string;
    file: {
        url: string;
        name: string;
    };
}

export interface DocumentGroup {
    id: string;
    title: string;
    cards: DocumentCard[];
}