import axios from "axios";

// API URL configuration
// Production: HTTPS EC2 backend via api.nctuaa.org.tw
// Development: Local Spring Boot
const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://api.nctuaa.org.tw/api";

const axiosInstance = axios.create({
    // Point to Spring Boot backend API
    // Use environment variable for API URL, fallback to localhost for development
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // 30秒超時
});

// 請求攔截器 - 記錄請求
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('🚀 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.baseURL + config.url,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// 回應攔截器 - 記錄回應和錯誤
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        if (error.response) {
            // 伺服器回應了錯誤狀態碼
            console.error('❌ API Error Response:', {
                url: error.config?.url,
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            // 請求已發出但沒有收到回應
            console.error('❌ No Response from Server:', {
                url: error.config?.url,
                message: 'Server did not respond. Check if API is running and CORS is configured.'
            });
        } else {
            // 請求設定時發生錯誤
            console.error('❌ Request Setup Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;