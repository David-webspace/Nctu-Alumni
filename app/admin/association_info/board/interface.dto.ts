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

export interface MemberInfo {
    name: string;
    photo?: string;
    email?: string;
    description?: string;
    phone?: string;
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
  photo?: string;
  description?: string;
}