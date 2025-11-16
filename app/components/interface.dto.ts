export interface NewsItem {
  newsId: number;
  title: string;
  content: number;
  publishDate: number;
  expireDate: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  imageAlt: string;
  imageUrl?: string;
}

export interface EmployeeItem {
    empId: string;
    empName: string;
    title: string;
    tel: string;
}


export interface ResponseTemplate<T> {
  items: T[];
}

export interface ResponseTemplateWithPage<T> {
  items: T[];
  pageItem: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
  };
}