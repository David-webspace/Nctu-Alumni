import axios from "axios";

const axiosInstance = axios.create({
    // Point to Spring Boot backend API
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;