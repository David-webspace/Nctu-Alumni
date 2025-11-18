import axiosInstance from "./axiosinstance";

export const getNews = async () => {
    const res = await axiosInstance.get('/news');
    return res.data;
}

export const getNewsById = async (userData: any) => {
    const res = await axiosInstance.post(`/news/getNews`, userData);
    return res.data;
};

// 查詢最新消息，userData 格式需符合後端 Spring Boot API 要求
export const queryNews = async (userData: any) => {
    const res = await axiosInstance.post('/news/query', userData );
    return res.data;
};

export const createNews = async (userData: any) => {
    const res = await axiosInstance.post('/news/create', userData );
    return res.data;
};

export const updateNews = async (userData: any) => {
    const res = await axiosInstance.post('/news/update', userData );
    return res.data;
};

export const removeNews = async (userData: any) => {
    const res = await axiosInstance.post('/news/remove', userData );
    return res.data;
};