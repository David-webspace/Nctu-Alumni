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

export interface MwHeader {
  requestId: string;
}

export interface NewsByIdRequest {
  mwHeader: MwHeader;
  tranRq: {
    items: { newsId: string; };
  };
}

export interface NewsQueryRequest {
  mwHeader: MwHeader;
  tranRq: {
    items: Partial<NewsItem>;
    pageItem: {
      pageNumber: number;
      pageSize: number;
    };
  };
}

export interface NewsCreateRequest {
  mwHeader: MwHeader;
  tranRq: {
    items: Omit<NewsItem, 'newsId' | 'createdAt' | 'updatedAt'>;
  };
}

export interface NewsUpdateRequest {
  mwHeader: MwHeader;
  tranRq: {
    items: NewsItem;
  };
}

export interface NewsRemoveRequest {
  mwHeader: MwHeader;
  tranRq: {
    items: { newsId: string; };
  };
}