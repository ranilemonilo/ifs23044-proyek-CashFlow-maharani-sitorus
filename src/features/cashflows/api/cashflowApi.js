// src/features/cashflows/api/CashFlowApi.js
import { apiHelper } from "@/helpers/apiHelper";

const CashFlowApi = {
  // 🟢 Ambil semua data cashflow (bisa difilter)
  async getAll(token, filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await apiHelper.get(`/cash-flows?${params}`, token);
  },

  // 🟢 Tambah data baru
  async create(data, token) {
    // data berupa FormData karena Content-Type: multipart/form-data
    return await apiHelper.post("/cash-flows", data, token, true);
  },

  // 🟡 Ambil detail data berdasarkan ID
  async getById(id, token) {
    return await apiHelper.get(`/cash-flows/${id}`, token);
  },

  // 🔵 Update data cashflow
  async update(id, data, token) {
    return await apiHelper.put(`/cash-flows/${id}`, data, token);
  },

  // 🔴 Hapus data
  async remove(id, token) {
    return await apiHelper.delete(`/cash-flows/${id}`, token);
  },

  // 🏷️ Ambil daftar label user
  async getLabels(token) {
    return await apiHelper.get("/cash-flows/labels", token);
  },

  // 📅 Statistik harian
  async getStatsDaily(token, filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await apiHelper.get(`/cash-flows/stats/daily?${params}`, token);
  },

  // 📆 Statistik bulanan
  async getStatsMonthly(token, filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return await apiHelper.get(`/cash-flows/stats/monthly?${params}`, token);
  },
};

export default CashFlowApi;
