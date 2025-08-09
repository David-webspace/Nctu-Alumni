import axiosInstance from "./axiosinstance";

export const getNews = async () => {
    const res = await axiosInstance.get('/news');
    return res.data;
}

export const getNewsById = async (id) => {
    const res = await axiosInstance.get(`/news/${id}`);
    return res.data;
};

export const createNews = async (userData) => {
    const res = await axiosInstance.post('/news/createNews', userData );
    return res.data;
};
