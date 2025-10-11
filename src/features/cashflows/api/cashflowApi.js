// src/features/cashflows/api/CashFlowApi.js
import { apiHelper } from "@/helpers/apiHelper";

const CashFlowApi = {
  // 🟢 Ambil semua data cashflow (dengan filter opsional)
  async getAll(token, filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await apiHelper.get(
      `/cash-flows${params ? `?${params}` : ""}`,
      token
    );
  },

  // 🟢 Tambah data baru
  async create(data, token) {
    console.log("📤 Data dikirim ke API:", data);
    return await apiHelper.post("/cash-flows", data, token, false);
  },

  // 🟡 Ambil data cashflow berdasarkan ID
  async getById(id, token) {
    return await apiHelper.get(`/cash-flows/${id}`, token);
  },

  // 🔵 Update data cashflow
  async update(id, data, token) {
    console.log("📤 Update data dikirim:", data);
    return await apiHelper.put(`/cash-flows/${id}`, data, token, false);
  },

  // 🔴 Hapus data cashflow
  async remove(id, token) {
    return await apiHelper.delete(`/cash-flows/${id}`, token);
  },

  // 🏷️ Ambil daftar label milik user
  async getLabels(token) {
    return await apiHelper.get("/cash-flows/labels", token);
  },

  // 📅 Statistik harian ✅
  async getStatsDaily(token) {
    return await apiHelper.get(`/cash-flows/stats/daily`, token);
  },

  // 📆 Statistik bulanan
  async getStatsMonthly(token, filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await apiHelper.get(
      `/cash-flows/stats/monthly${params ? `?${params}` : ""}`,
      token
    );
  },
};

export default CashFlowApi;
