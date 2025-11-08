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
    empId: string;  // 改為 string，因為 API 回傳 "E001" 格式
    empName: string;
    title: string;
    tel: string;
}
