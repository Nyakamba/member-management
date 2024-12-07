import { LoginFormData } from "@/pages/Login";
import { RegisterFormData } from "@/pages/Register";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getMe = async () => {
  const response = await axiosInstance.get("/api/auth/me");
  return response.data;
};

export const register = async (formData: RegisterFormData) => {
  const response = await axiosInstance.post("/api/auth/register", formData);

  return response.data;
};

export const login = async (formData: LoginFormData) => {
  await axiosInstance.post("/api/auth/login", formData);
};

export const validateToken = async () => {
  const response = await axiosInstance.get("/api/auth/validate-token");

  if (!response.data) {
    throw new Error("Invalid token");
  }

  return response.data;
};

export const signOut = async () => {
  await axiosInstance.post(`/api/auth/logout`);
};

export const addMember = async (formData: FormData) => {
  const response = await axiosInstance.post("/api/members/create", formData);

  return response.data;
};

export const getMembers = async (
  search: string,
  page: number,
  sortField: string,
  sortOrder: string
) => {
  const response = await axiosInstance.get(`/api/members`, {
    params: { search, page, sortField, sortOrder },
  });

  return response.data;
};

export const getMemberById = async (memberId: string) => {
  const response = await axiosInstance.get(`api/members/${memberId}`);

  return response.data;
};

export const editMember = async (id: string, formData: FormData) => {
  const response = await axiosInstance.put(
    `/api/members/update/${id}`,
    formData
  );

  return response.data;
};

export const deleteMember = async (id: number) => {
  const response = await axiosInstance.delete(`/api/members/delete/${id}`);

  return response.data;
};

export const getMemberStats = async () => {
  const response = await axiosInstance.get(`/api/stats`);

  return response.data;
};
