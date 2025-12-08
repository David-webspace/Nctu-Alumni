export interface EmployeeItem {
    empId: string;
    empName: string;
    title: string;
    tel: string;
}

export interface ResponseTemplate<T> {
  items: T[];
}

export interface RequestTemplateWithPage<T> {
  items: T[];
  pageItem: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
  };
}

export interface RequestTemplate<T> {
  items: T | T[];
}

export interface ResponseTemplateWithPage<T> {
  items: T[];
  pageItem: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
  };
}

export interface StatusResponse {
    method: string;
    status: string;
    message: string;
};