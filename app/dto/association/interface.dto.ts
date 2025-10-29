export type ContentBlockType = 'image' | 'text';

export interface Block {
    id: number;
    type: ContentBlockType;
    content: string;
}
