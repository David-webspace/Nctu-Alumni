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
  boardId: string;
  memberId: string;
  memberName: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
  branchName: string;
}

export interface BoardQueryResponse {
  items: BoardItem[];
  pageItem: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
  };
}