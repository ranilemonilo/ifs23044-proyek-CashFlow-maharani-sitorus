import { apiHelper } from "@/helpers/apiHelper";

// ✅ Pastikan environment sudah terbaca
const BASE_URL =
  import.meta.env.VITE_DELCOM_BASEURL?.trim().replace(/\/+$/, "") ||
  "https://open-api.delcom.org/api/v1"; // fallback aman

// Debug: lihat apakah environment kebaca
console.log("🌍 BASE URL (aktif):", BASE_URL);

const AuthApi = {
  // 🟢 REGISTER
  async register(formData) {
    const url = `${BASE_URL}/auth/register`;
    console.log("📦 Register URL:", url);
    console.log("📤 Data dikirim:", formData);

    try {
      const response = await apiHelper.post(url, formData);
      console.log("✅ Response register:", response);
      return response;
    } catch (error) {
      console.error("❌ Error register:", error);
      throw error;
    }
  },

  // 🟢 LOGIN
  async login(formData) {
    const url = `${BASE_URL}/auth/login`;
    console.log("📦 Login URL:", url);
    console.log("📤 Data dikirim:", formData);

    try {
      const response = await apiHelper.post(url, formData);
      console.log("✅ Response login:", response);
      return response;
    } catch (error) {
      console.error("❌ Error login:", error);
      throw error;
    }
  },

  // 🟢 PROFILE
  async getProfile(token) {
    const url = `${BASE_URL}/auth/profile`;
    console.log("📦 Profile URL:", url);

    try {
      const response = await apiHelper.get(url, token);
      console.log("✅ Response profile:", response);
      return response;
    } catch (error) {
      console.error("❌ Error profile:", error);
      throw error;
    }
  },
};

export default AuthApi;
