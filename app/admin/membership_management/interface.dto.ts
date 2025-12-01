export interface MemberItem {
    memberId: string;
    memberName: string;
    personalId: string;
    gender: string;
    phone: string;
    email: string;
    department: string;
    minor: string;
    branchId: string;
    branchName: string;
    role: string;
    graduatedYear: string;
    startYear: string;

    // 新增的基本資訊欄位
    title?: string;
    termNumber?: string;
    spouseName?: string;
    birthday?: Date;
    location?: string;
    nationality?: string;
    conditionStatus?: string;

    // 新增的聯絡資訊欄位
    mobilePhone1?: string;
    mobilePhone2?: string;
    zipcode?: string;
    mailingAddress?: string;
    residentialAddress?: string;

    // 新增的個人特質欄位
    expertise?: string;
    interests?: string;
    remarks?: string;
    alumniRemarks?: string;

    // 新增的學歷欄位
    bachelorDegree?: string;
    masterDegree?: string;
    doctoralDegree?: string;

    // 新增的工作資訊欄位
    companyName?: string;
    industryType?: string;
    jobTitle?: string;
    companyPhone?: string;
    companyFax?: string;
    companyZipcode?: string;
    companyAddress?: string;
    companyEmail?: string;

    // 新增的會員資訊欄位
    memberType?: string;
    affiliatedUnit?: string;
    alumniCardNumber?: string;
    joinDate?: Date;
    expiryDate?: Date;
    newsletterSubscription?: string;
    paymentRecord?: string;
    familyApplication?: string;
    alumniAssociationEmail?: string;
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

    // 基本資訊
    title?: string;
    termNumber?: string;
    spouseName?: string;
    birthday?: string; // Use string for query simplicity
    location?: string;
    nationality?: string;
    conditionStatus?: string;

    // 聯絡資訊
    mobilePhone1?: string;
    mobilePhone2?: string;
    zipcode?: string;
    mailingAddress?: string;
    residentialAddress?: string;

    // 個人特質
    expertise?: string;
    interests?: string;
    remarks?: string;
    alumniRemarks?: string;

    // 學歷
    bachelorDegree?: string;
    masterDegree?: string;
    doctoralDegree?: string;

    // 工作資訊
    companyName?: string;
    industryType?: string;
    jobTitle?: string;
    companyPhone?: string;
    companyFax?: string;
    companyZipcode?: string;
    companyAddress?: string;
    companyEmail?: string;

    // 會員資訊
    memberType?: string;
    affiliatedUnit?: string;
    alumniCardNumber?: string;
    joinDate?: string; // Use string for query simplicity
    expiryDate?: string; // Use string for query simplicity
    newsletterSubscription?: string;
    paymentRecord?: string;
    familyApplication?: string;
    alumniAssociationEmail?: string;
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

export interface DepartmentItem {
    departmentId: string;
    departmentName: string;
}