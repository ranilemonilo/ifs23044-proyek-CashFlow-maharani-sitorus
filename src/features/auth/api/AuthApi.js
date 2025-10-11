// src/features/auth/api/AuthApi.js
import { apiHelper } from "@/helpers/apiHelper";

const AuthApi = {
  // REGISTER
  async register(formData) {
    // 🧩 Tambahkan log ini untuk tes env di console browser
    console.log("🌍 BASE URL:", import.meta.env.VITE_DELCOM_BASEURL);

    try {
      const response = await apiHelper.post("/auth/register", formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // LOGIN
  async login(formData) {
    try {
      const response = await apiHelper.post("/auth/login", formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // GET PROFILE (optional)
  async getProfile(token) {
    try {
      const response = await apiHelper.get("/auth/profile", token);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthApi;
