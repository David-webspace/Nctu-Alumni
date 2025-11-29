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

export interface ConstitutionRequest {
  mwHeader: {
    requestId: string;
  };
  tranRq: {};
}

export type BoardRegionKey = 'general' | 'taipei' | 'hsinchu' | 'taichung' | 'kaohsiung' | 'shanghai';

export type BoardListFieldKey =
  | 'viceChairmen'
  | 'executiveSecratary'
  | 'executiveDirectors'
  | 'directors'
  | 'altDirectors'
  | 'convener'
  | 'executiveSupervisors'
  | 'supervisors'
  | 'altSupervisors';

export interface Member {
  name: string;
  email: string;
  phone: string;
}

export type BoardRegion = {
  title: string;
  description: string;
  chairman: {
    name: string;
    title: string;
    img: string;
  };
} & {
  [K in BoardListFieldKey]: Member[];
};

export type BoardDataMap = Record<BoardRegionKey, BoardRegion>;