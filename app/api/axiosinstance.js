import axios from "axios";

// Debug: Log the API URL being used
const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
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