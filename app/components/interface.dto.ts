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

export interface MemberItem {
    memberId: string;
    memberName: string;
    personalId: string;
    gender: string;
    email: string;
    phone: string;
    department: string;
    minor: string;
    branch: string;
    role: string;
    graduatedYear: string;
    startYear: string;
}
