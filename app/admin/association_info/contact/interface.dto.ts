// Contact Info interfaces
export interface ContactInfo {
  id?: string;
  workingHours: string;
  phone: string;
  address: string;
  email: string;
  generalPhone: string; // 總機號碼
}

export interface ContactInfoRequest {
  workingHours: string;
  phone: string;
  address: string;
  email: string;
  generalPhone: string;
}

export interface ContactInfoResponse {
  id: string;
  workingHours: string;
  phone: string;
  address: string;
  email: string;
  generalPhone: string;
}

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