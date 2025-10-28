// Article interface
export interface Article {
  id: string;
  articleNo: string;
  articleLabel: string;
  content: string;
}

// Chapter interface
export interface Chapter {
  id: string;
  chapterNo: string;
  title: string;
  slug: string;
}

// Constitution data structure
export interface ConstitutionData {
  chapter: Chapter;
  article: Article[];
}

// API Response interface
export interface ConstitutionResponse {
  mwHeader: {
    requestId: string;
  };
  tranRs: {
    items: ConstitutionData[];
  };
}
