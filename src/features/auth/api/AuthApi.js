import { apiHelper } from "@/helpers/apiHelper";

// Ambil base URL dari .env
const BASE_URL = import.meta.env.VITE_DELCOM_BASEURL;

// Log ini dijalankan begitu file dimuat
console.log("🚀 [AuthApi] Loaded with BASE_URL =", BASE_URL);

const AuthApi = {
  async register(formData) {
    console.log("🌍 BASE URL:", BASE_URL);
    console.log("📦 Register URL:", `${BASE_URL}/auth/register`);

    try {
      const response = await apiHelper.post(
        `${BASE_URL}/auth/register`,
        formData
      );
      return response;
    } catch (error) {
      console.error("❌ Error register:", error);
      throw error;
    }
  },

  async login(formData) {
    console.log("📦 Login URL:", `${BASE_URL}/auth/login`);
    try {
      const response = await apiHelper.post(`${BASE_URL}/auth/login`, formData);
      return response;
    } catch (error) {
      console.error("❌ Error login:", error);
      throw error;
    }
  },

  async getProfile(token) {
    console.log("📦 Profile URL:", `${BASE_URL}/auth/profile`);
    try {
      const response = await apiHelper.get(`${BASE_URL}/auth/profile`, token);
      return response;
    } catch (error) {
      console.error("❌ Error profile:", error);
      throw error;
    }
  },
};

export default AuthApi;
