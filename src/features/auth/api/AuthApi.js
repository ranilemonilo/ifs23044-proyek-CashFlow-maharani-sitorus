// src/features/auth/api/AuthApi.js
import { apiHelper } from "@/helpers/apiHelper";

const BASE_URL = import.meta.env.VITE_DELCOM_BASEURL;

const AuthApi = {
  // REGISTER
  async register(formData) {
    console.log("🌍 BASE URL:", BASE_URL);
    try {
      const response = await apiHelper.post(
        `${BASE_URL}/auth/register`,
        formData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // LOGIN
  async login(formData) {
    try {
      const response = await apiHelper.post(`${BASE_URL}/auth/login`, formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // GET PROFILE
  async getProfile(token) {
    try {
      const response = await apiHelper.get(`${BASE_URL}/auth/profile`, token);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthApi;
