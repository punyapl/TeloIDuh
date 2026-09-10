// --- Inline nodes (Strapi Rich Text format) ---
export interface TextNode {
    type: 'text'
    text: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
}

export interface LinkNode {
    type: 'link'
    url: string
    target?: string
    rel?: string
    children: TextNode[]
}

export type InlineNode = TextNode | LinkNode

// --- Block nodes ---
export interface ParagraphBlock {
    type: 'paragraph'
    children: InlineNode[]
}

export interface HeadingBlock {
    type: 'heading'
    level: 1 | 2 | 3 | 4 | 5 | 6
    children: InlineNode[]
}

export interface ListItemBlock {
    type: 'list-item'
    children: InlineNode[]
}

export interface ListBlock {
    type: 'list'
    format: 'ordered' | 'unordered'
    children: ListItemBlock[]
}

export interface QuoteBlock {
    type: 'quote'
    children: InlineNode[]
}

export type ArticleBlock = ParagraphBlock | HeadingBlock | ListBlock | QuoteBlock

// --- News entity ---
export interface ArticleImage {
    url: string;
    name: string;
    alternativeText?: string;
}

export interface ArticleItem {
    id: number
    documentId: string
    title: string
    slug: string
    shortDescription: string
    date: string
    theme: string
    image: ArticleImage
    content: ArticleBlock[]
}