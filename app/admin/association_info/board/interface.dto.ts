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

export interface BoardItem {
  memberId: string;
  memberName: string;
  email: string;
  phone: string;
  title: string;
}

export interface BoardQueryResponse<T> {
  items: T[];
  pageItem: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
  };
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

