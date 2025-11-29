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

export interface MwHeader {
  requestId: string;
}

export interface RequestTemplate<T> {
  mwHeader: MwHeader;
  tranRq: {
    items: T | T[];
    pageItem?: {
      pageNumber: number;
      pageSize: number;
    };
  };
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
};