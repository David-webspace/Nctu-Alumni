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