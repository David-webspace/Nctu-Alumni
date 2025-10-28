import axiosInstance from "./axiosinstance";

// 查詢所有章程資料
export const queryConsitutions = async (userData) => {
    const res = await axiosInstance.post('/constitution/queryConstitutions', userData);
    return res.data;
};

// 獲取章節列表
export const getChapters = async (userData) => {
    const res = await axiosInstance.post('/constitution/getChapters', userData);
    return res.data;
};

// 創建章節
export const createChapter = async (userData) => {
    const res = await axiosInstance.post('/constitution/createChapter', userData);
    return res.data;
};

// 更新章節
export const updateChapter = async (userData) => {
    const res = await axiosInstance.post('/constitution/updateChapter', userData);
    return res.data;
};

// 刪除章節
export const deleteChapter = async (userData) => {
    const res = await axiosInstance.post('/constitution/deleteChapter', userData);
    return res.data;
};

// ==================== Article APIs ====================

// 更新單一條文
export const updateArticle = async (userData) => {
    const res = await axiosInstance.post('/constitution/updateArticle', userData);
    return res.data;
};

// 批量更新條文（用於重新排序）
export const updateArticles = async (userData) => {
    const res = await axiosInstance.post('/constitution/updateArticle', userData);
    return res.data;
};

// 創建條文
export const createArticle = async (userData) => {
    const res = await axiosInstance.post('/constitution/createArticle', userData);
    return res.data;
};

// 刪除條文
export const deleteArticle = async (userData) => {
    const res = await axiosInstance.post('/constitution/deleteArticle', userData);
    return res.data;
};