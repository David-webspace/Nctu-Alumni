export interface MemberItem {
    memberId: string;
    memberName: string;
    personalId: string;
    gender: string;
    email: string;
    phone: string;
    department: string;
    minor: string;
    branchId: string;
    branchName: string;
    role: string;
    graduatedYear: string;
    startYear: string;
}

// Member related interfaces
export interface MemberQueryRequest {
    memberId: string;
    memberName: string;
    personalId: string;
    gender: string;
    phone: string;
    email: string;
    department: string;
    minor: string;
    branch: string;
    role: string;
    graduatedYear: string;
    startYear: string;
    pageItem: {
        pageNumber: number;
        pageSize: number;
    };
}

export interface MemberQueryResponse<T> {
    items: T[];
    pageItem: {
        pageSize: number;
        pageNumber: number;
        totalCount: number;
    };
}

export interface BranchItem {
    branchId: string;
    branchName: string;
    description: string | null;
    president: string | null;
}

export interface BranchQueryResponse {
    items: BranchItem[];
}