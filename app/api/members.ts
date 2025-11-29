import { MemberItem, MemberQueryRequest, MemberQueryResponse } from "../admin/membership_management/interface.dto";
import { ResponseTemplate } from "../components/interface.dto";
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
    const res = await axiosInstance.post('/members/query', requestBody);
    return res.data;
}

export const queryMemberByIdAndName = async (queryInput: string): Promise<ResponseTemplate<MemberItem>> => {
    const requestBody = {
        queryInput: queryInput
    };
    const res = await axiosInstance.post('/members/queryByIdAndName', requestBody);
    return res.data;
}

export const updateMember = async (memberData: MemberItem): Promise<ResponseTemplate<MemberItem>> => {
    const res = await axiosInstance.put(`/members/update/${memberData.memberId}`, memberData);
    return res.data;
};