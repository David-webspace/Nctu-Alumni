import axios from "axios";

// API URL configuration
// Production: EC2 backend
// Development: Local Spring Boot
const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://api.nctuaa.org.tw/api";
console.log("🔗 API Base URL:", apiURL);

const axiosInstance = axios.create({
    // Point to Spring Boot backend API
    // Use environment variable for API URL, fallback to localhost for development
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;