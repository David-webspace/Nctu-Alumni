import { AxiosError } from "axios";
import { MemberItem, MemberQueryRequest, MemberQueryResponse } from "../admin/membership_management/interface.dto";
import { ResponseTemplate, StatusResponse } from "../components/interface.dto";
import axiosInstance from "./axiosinstance";

export const queryMembers = async(request: Partial<MemberQueryRequest>): Promise<MemberQueryResponse<MemberItem>> => {
    const requestBody = {
        memberId: request.memberId || "",
        memberName: request.memberName || "",
        personalId: request.personalId || "",
        gender: request.gender || "",
        phone: request.phone || "",
        email: request.email || "",
        department: request.department || "",
        minor: request.minor || "",
        branch: request.branch || "",
        role: request.role || "",
        graduatedYear: request.graduatedYear || "",
        startYear: request.startYear || "",
        title: request.title || "",
        termNumber: request.termNumber || "",
        memberType: request.memberType || "",
        conditionStatus: request.conditionStatus || "",
        spouseName: request.spouseName || "",
        birthday: request.birthday || "",
        location: request.location || "",
        nationality: request.nationality || "",
        mobilePhone1: request.mobilePhone1 || "",
        mobilePhone2: request.mobilePhone2 || "",
        zipcode: request.zipcode || "",
        mailingAddress: request.mailingAddress || "",
        residentialAddress: request.residentialAddress || "",
        expertise: request.expertise || "",
        interests: request.interests || "",
        remarks: request.remarks || "",
        alumniRemarks: request.alumniRemarks || "",
        bachelorDegree: request.bachelorDegree || "",
        doctoralDegree: request.doctoralDegree || "",
        companyName: request.companyName || "",
        industryType: request.industryType || "",
        jobTitle: request.jobTitle || "",
        companyPhone: request.companyPhone || "",
        companyFax: request.companyFax || "",
        companyZipcode: request.companyZipcode || "",
        companyAddress: request.companyAddress || "",
        companyEmail: request.companyEmail || "",
        affiliatedUnit: request.affiliatedUnit || "",
        alumniCardNumber: request.alumniCardNumber || "",
        joinDate: request.joinDate || "",
        expiryDate: request.expiryDate || "",
        newsletterSubscription: request.newsletterSubscription || "",
        paymentRecord: request.paymentRecord || "",
        familyApplication: request.familyApplication || "",
        alumniAssociationEmail: request.alumniAssociationEmail || "",
        pageItem: {
            pageNumber: request.pageItem?.pageNumber ?? 1,
            pageSize: request.pageItem?.pageSize ?? 10
        }
    };

    try {
        const res = await axiosInstance.post('/members/query', requestBody);
        return res.data;
    } catch (error: unknown) {
        // 如果是 404 錯誤（查無資料），返回空結果而不是拋出錯誤
        if (error instanceof AxiosError && error.response && error.response.status === 404) {
            return {
                items: [],
                pageItem: {
                    pageSize: request.pageItem?.pageSize ?? 10,
                    pageNumber: request.pageItem?.pageNumber ?? 1,
                    totalCount: 0
                }
            };
        }
        // 其他錯誤仍然拋出
        throw error;
    }
}

export const queryMemberByIdAndName = async (queryInput: string): Promise<ResponseTemplate<MemberItem>> => {
    const requestBody = {
        queryInput: queryInput
    };
    const res = await axiosInstance.post('/members/queryByIdAndName', requestBody);
    return res.data;
}

export const updateMember = async (memberData: MemberItem): Promise<StatusResponse> => {
    const requestBody = {
        memberId: memberData.memberId || "",
        memberName: memberData.memberName || "",
        personalId: memberData.personalId || "",
        gender: memberData.gender || "",
        phone: memberData.phone || "",
        email: memberData.email || "",
        department: memberData.departmentId || "",
        minor: memberData.minorId || "",
        branch: memberData.branch || "",
        role: memberData.roleId || "",
        graduatedYear: memberData.graduatedYear || "",
        startYear: memberData.startYear || "",
        title: memberData.title || "",
        termNumber: memberData.termNumber || "",
        memberType: memberData.memberType || "",
        conditionStatus: memberData.conditionStatus || "",
        spouseName: memberData.spouseName || "",
        birthday: memberData.birthday ? (typeof memberData.birthday === 'string' ? memberData.birthday : new Date(memberData.birthday).toISOString().split('T')[0]) : "",
        location: memberData.location || "",
        nationality: memberData.nationality || "",
        mobilePhone1: memberData.mobilePhone1 || "",
        mobilePhone2: memberData.mobilePhone2 || "",
        zipcode: memberData.zipcode || "",
        mailingAddress: memberData.mailingAddress || "",
        residentialAddress: memberData.residentialAddress || "",
        expertise: memberData.expertise || "",
        interests: memberData.interests || "",
        remarks: memberData.remarks || "",
        alumniRemarks: memberData.alumniRemarks || "",
        bachelorDegree: memberData.bachelorDegree || "",
        doctoralDegree: memberData.doctoralDegree || "",
        companyName: memberData.companyName || "",
        industryType: memberData.industryType || "",
        jobTitle: memberData.jobTitle || "",
        companyPhone: memberData.companyPhone || "",
        companyFax: memberData.companyFax || "",
        companyZipcode: memberData.companyZipcode || "",
        companyAddress: memberData.companyAddress || "",
        companyEmail: memberData.companyEmail || "",
        affiliatedUnit: memberData.affiliatedUnit || "",
        alumniCardNumber: memberData.alumniCardNumber || "",
        joinDate: memberData.joinDate ? (typeof memberData.joinDate === 'string' ? memberData.joinDate : new Date(memberData.joinDate).toISOString().split('T')[0]) : "",
        expiryDate: memberData.expiryDate ? (typeof memberData.expiryDate === 'string' ? memberData.expiryDate : new Date(memberData.expiryDate).toISOString().split('T')[0]) : "",
        newsletterSubscription: memberData.newsletterSubscription || "",
        paymentRecord: memberData.paymentRecord || "",
        familyApplication: memberData.familyApplication || "",
        alumniAssociationEmail: memberData.alumniAssociationEmail || ""
    };

    console.log('Update request body:', requestBody);

    try {
        const res = await axiosInstance.post(`/members/update`, requestBody);
        return res.data;
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error && 'config' in error) {
            const axiosError = error as {
                message: string;
                response?: {
                    status: number;
                    statusText: string;
                    data: unknown;
                };
                config?: {
                    url: string;
                    method: string;
                    data: unknown;
                };
            };

            console.error('API Error Details:', {
                message: axiosError.message,
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                data: axiosError.response?.data,
                config: {
                    url: axiosError.config?.url,
                    method: axiosError.config?.method,
                    data: axiosError.config?.data
                }
            });
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
};

export const createMember = async (memberData: MemberItem): Promise<StatusResponse> => {
    const requestBody = {
        memberId: memberData.memberId || "",
        memberName: memberData.memberName || "",
        personalId: memberData.personalId || "",
        gender: memberData.gender || "",
        phone: memberData.phone || "",
        email: memberData.email || "",
        department: memberData.departmentId || "",
        minor: memberData.minorId || "",
        branch: memberData.branch || "",
        role: memberData.roleId || "",
        graduatedYear: memberData.graduatedYear || "",
        startYear: memberData.startYear || "",
        title: memberData.title || "",
        termNumber: memberData.termNumber || "",
        memberType: memberData.memberType || "",
        conditionStatus: memberData.conditionStatus || "",
        spouseName: memberData.spouseName || "",
        birthday: memberData.birthday ? (typeof memberData.birthday === 'string' ? memberData.birthday : new Date(memberData.birthday).toISOString().split('T')[0]) : "",
        location: memberData.location || "",
        nationality: memberData.nationality || "",
        mobilePhone1: memberData.mobilePhone1 || "",
        mobilePhone2: memberData.mobilePhone2 || "",
        zipcode: memberData.zipcode || "",
        mailingAddress: memberData.mailingAddress || "",
        residentialAddress: memberData.residentialAddress || "",
        expertise: memberData.expertise || "",
        interests: memberData.interests || "",
        remarks: memberData.remarks || "",
        alumniRemarks: memberData.alumniRemarks || "",
        bachelorDegree: memberData.bachelorDegree || "",
        doctoralDegree: memberData.doctoralDegree || "",
        companyName: memberData.companyName || "",
        industryType: memberData.industryType || "",
        jobTitle: memberData.jobTitle || "",
        companyPhone: memberData.companyPhone || "",
        companyFax: memberData.companyFax || "",
        companyZipcode: memberData.companyZipcode || "",
        companyAddress: memberData.companyAddress || "",
        companyEmail: memberData.companyEmail || "",
        affiliatedUnit: memberData.affiliatedUnit || "",
        alumniCardNumber: memberData.alumniCardNumber || "",
        joinDate: memberData.joinDate ? (typeof memberData.joinDate === 'string' ? memberData.joinDate : new Date(memberData.joinDate).toISOString().split('T')[0]) : "",
        expiryDate: memberData.expiryDate ? (typeof memberData.expiryDate === 'string' ? memberData.expiryDate : new Date(memberData.expiryDate).toISOString().split('T')[0]) : "",
        newsletterSubscription: memberData.newsletterSubscription || "",
        paymentRecord: memberData.paymentRecord || "",
        familyApplication: memberData.familyApplication || "",
        alumniAssociationEmail: memberData.alumniAssociationEmail || ""
    };

    console.log('Update request body:', requestBody);

    try {
        const res = await axiosInstance.post(`/members/create`, requestBody);
        return res.data;
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'response' in error && 'config' in error) {
            const axiosError = error as {
                message: string;
                response?: {
                    status: number;
                    statusText: string;
                    data: unknown;
                };
                config?: {
                    url: string;
                    method: string;
                    data: unknown;
                };
            };

            console.error('API Error Details:', {
                message: axiosError.message,
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                data: axiosError.response?.data,
                config: {
                    url: axiosError.config?.url,
                    method: axiosError.config?.method,
                    data: axiosError.config?.data
                }
            });
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
};