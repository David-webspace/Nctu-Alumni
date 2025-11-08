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
});

export default axiosInstance;