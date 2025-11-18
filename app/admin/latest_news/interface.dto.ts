export interface NewsItem {
    newsId: string;
    title: string;
    content: string;
    publishDate: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    expireDate: string;
    authorId: string;
    imageAlt: string;
    imageUrl?: string;
}