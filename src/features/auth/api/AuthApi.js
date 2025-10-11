import { apiHelper } from "@/helpers/apiHelper";

// Ambil dari environment (.env)
const BASE_URL = import.meta.env.VITE_DELCOM_BASEURL;

const AuthApi = {
  // 🟢 REGISTER
  async register(formData) {
    // Tambahkan log untuk debug environment dan endpoint
    console.log("🌍 BASE URL:", BASE_URL);
    console.log("📦 Register URL:", `${BASE_URL}/auth/register`);
    console.log("📤 Data dikirim:", formData);

    try {
      const response = await apiHelper.post(
        `${BASE_URL}/auth/register`,
        formData
      );
      console.log("✅ Response register:", response);
      return response;
    } catch (error) {
      console.error("❌ Error register:", error);
      throw error;
    }
  },

  // 🟢 LOGIN
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

  // 🟢 GET PROFILE
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
