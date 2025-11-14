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

export interface RoleItem {
  roleId: string;
  role: string;
}

export interface BoardItem {
  memberId: string;
  memberName: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
}

export interface BoardQueryResponse {
  items: BoardItem[];
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

