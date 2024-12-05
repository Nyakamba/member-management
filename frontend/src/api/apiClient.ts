import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

console.log("API_BASE_URL", API_BASE_URL);

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const validateToken = async () => {
  const response = await axiosInstance.get("/api/auth/validate-token");
  console.log(response);

  if (!response.data) {
    throw new Error("Invalid token");
  }

  return response.data;
};
