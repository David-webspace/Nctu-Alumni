// Employee related interfaces
export interface EmployeeQueryRequest {
    text: string;
    pageItem: {
        pageNumber: number;
        pageSize: number;
    };
}

export interface EmployeeQueryResponse<T> {
    items: T[];
    pageItem: {
        pageSize: number;
        pageNumber: number;
        totalCount: number;
    };
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

export interface NewsItem {
    newsId?: string;
    title: string;
    content: string;
    publishDate: string;
    expireDate?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    authorId?: number;
    imageUrl?: string;
    imageAlt?: string;
}
