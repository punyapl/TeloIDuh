import { JSX, ReactNode } from 'react';
import { ArticleBlock, InlineNode } from '../../types';
import { Quote } from '@/shared/ui/Quote';

const headingClass: Record<number, string> = {
    1: 'font-h2',
    2: 'font-h2',
    3: 'font-h3',
    4: 'font-h4',
    5: 'font-h5',
    6: 'font-h6',
};

const renderInlineNode = (node: InlineNode, key: string): ReactNode => {
    if (node.type === 'text') {
        let className = '';
        if (node.bold) className += ' font-bold';
        if (node.italic) className += ' italic';
        if (node.strikethrough) className += ' line-through';
        if (node.underline) className += ' underline';
        return <span key={key} className={className.trim()}>{node.text}</span>;
    }
    return (
        <a
            key={key}
            href={node.url}
            target={node.target?.trim() || undefined}
            rel={node.rel?.trim() || 'noopener noreferrer'}
            className="font-inline-link"
        >
            {node.children.map((child, i) => renderInlineNode(child, `${key}-${i}`))}
        </a>
    );
};

const renderInlineNodes = (nodes: InlineNode[], prefix: string): ReactNode =>
    nodes.map((node, i) => renderInlineNode(node, `${prefix}-${i}`));

interface ArticleRendererProps {
    body: ArticleBlock[];
}

export const ArticleRenderer = ({ body }: ArticleRendererProps) => {
    return (
        <div className="flex flex-col gap-[40px] max-md:gap-[20px]">
            {body.map((block, index) => {
                switch (block.type) {
                    case 'paragraph':
                        return (
                            <p key={index} className="font-p-md text-text-primary">
                                {renderInlineNodes(block.children, `p-${index}`)}
                            </p>
                        );
                    case 'heading':
                        const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
                        return (
                            <Tag key={index} className={`${headingClass[block.level]} text-heading uppercase`}>
                                {renderInlineNodes(block.children, `h-${index}`)}
                            </Tag>
                        );
                    case 'list':
                        const items = block.children.map((child, li) => (
                            <li key={li} className="font-p-md text-text-primary">
                                {renderInlineNodes(child.children, `li-${index}-${li}`)}
                            </li>
                        ));
                        return block.format === 'ordered'
                            ? <ol key={index} className="list-decimal list-inside flex flex-col gap-1">{items}</ol>
                            : <ul key={index} className="list-disc list-inside flex flex-col gap-1">{items}</ul>;
                    case 'quote':
                        return (
                            <Quote key={index}>
                                {renderInlineNodes(block.children, `q-${index}`)}
                            </Quote>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};