import { Article, ArticleUpdateRequest, Chapter, ConstitutionRequest, ConstitutionResponse } from "../admin/association_info/constitution/interface.dto";
import axiosInstance from "./axiosinstance";

// 查詢所有章程資料
export const queryConsitutions = async (userData: ConstitutionRequest): Promise<ConstitutionResponse> => {
    const res = await axiosInstance.post('/constitution/queryConstitutions', userData);
    return res.data;
};

// 獲取章節列表
export const getChapters = async (userData: Chapter) => {
    const res = await axiosInstance.post('/constitution/getChapters', userData);
    return res.data;
};

// 創建章節
export const createChapter = async (userData: Chapter) => {
    const res = await axiosInstance.post('/constitution/createChapter', userData);
    return res.data;
};

// 更新章節
export const updateChapter = async (userData: Chapter) => {
    const res = await axiosInstance.post('/constitution/updateChapter', userData);
    return res.data;
};

// 刪除章節
export const deleteChapter = async (userData: Chapter) => {
    const res = await axiosInstance.post('/constitution/deleteChapter', userData);
    return res.data;
};

// ==================== Article APIs ====================

// 更新單一條文
export const updateArticle = async (userData: ArticleUpdateRequest) => {
    const res = await axiosInstance.post('/constitution/updateArticle', userData);
    return res.data;
};

// 批量更新條文（用於重新排序）
export const updateArticles = async (userData: Article) => {
    const res = await axiosInstance.post('/constitution/updateArticle', userData);
    return res.data;
};

// 創建條文
export const createArticle = async (userData: Article) => {
    const res = await axiosInstance.post('/constitution/createArticle', userData);
    return res.data;
};

// 刪除條文
export const deleteArticle = async (userData: Article) => {
    const res = await axiosInstance.post('/constitution/deleteArticle', userData);
    return res.data;
};