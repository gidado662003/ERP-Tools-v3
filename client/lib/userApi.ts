import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://erp-tools-v3-1.onrender.com/api/user";

export const authAPI = {
  register: async (formData: {
    username: string;
    email: string;
    displayName: string;
    password: string;
    department?: string;
  }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (formData: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
