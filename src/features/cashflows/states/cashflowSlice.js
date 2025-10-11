import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CashFlowApi from "@/features/cashflows/api/CashFlowApi";

/* ========================
   🔹 AMBIL STATISTIK HARIAN
======================== */
export const fetchStatsDaily = createAsyncThunk(
  "cashflows/fetchStatsDaily",
  async ({ token }) => {
    const res = await CashFlowApi.getStatsDaily(token);
    console.log("📊 Response statistik harian dari API:", res);

    const data = res?.data?.data || {};
    const inflow = data.stats_inflow || [];
    const outflow = data.stats_outflow || [];

    if (inflow.length === 0 && outflow.length === 0) {
      console.warn("⚠️ Tidak ada data statistik harian dari API.");
      return [];
    }

    // 🔹 Gabungkan inflow & outflow berdasarkan urutan tanggal
    const merged = inflow.map((item, index) => ({
      date: item?.date || `Hari ${index + 1}`,
      inflow: item?.total || 0,
      outflow: outflow[index]?.total || 0,
    }));

    console.log("📈 Data Statistik Harian Siap:", merged);
    return merged;
  }
);

/* ========================
   🔹 AMBIL SEMUA CASHFLOW
======================== */
export const fetchCashFlows = createAsyncThunk(
  "cashflows/fetchCashFlows",
  async ({ token }) => {
    const res = await CashFlowApi.getAll(token);
    console.log("✅ Response getAll:", res);

    const cashFlows = res?.data?.cash_flows || [];
    const stats = res?.data?.stats || {};

    // 🧩 Tambahkan tanggal otomatis jika tidak ada
    const dataWithDate = cashFlows.map((item) => ({
      ...item,
      date:
        item.date ||
        item.created_at?.split("T")[0] || // ambil tanggal dari created_at
        new Date().toISOString().split("T")[0], // fallback tanggal hari ini
    }));

    return { cashFlows: dataWithDate, stats };
  }
);

/* ========================
   🔹 TAMBAH DATA
======================== */
export const addCashFlow = createAsyncThunk(
  "cashflows/addCashFlow",
  async ({ token, formData }, { dispatch }) => {
    const res = await CashFlowApi.create(formData, token);
    console.log("🟢 Data baru berhasil ditambahkan:", res);

    await dispatch(fetchCashFlows({ token }));
    return res?.data || {};
  }
);

/* ========================
   🔹 HAPUS DATA
======================== */
export const deleteCashFlow = createAsyncThunk(
  "cashflows/deleteCashFlow",
  async ({ id, token }) => {
    await CashFlowApi.remove(id, token);
    return id;
  }
);

/* ========================
   🔹 UPDATE DATA
======================== */
export const updateCashFlow = createAsyncThunk(
  "cashflows/updateCashFlow",
  async ({ id, token, data }) => {
    const res = await CashFlowApi.update(id, data, token);
    return res?.data?.data || {};
  }
);

// === AMBIL DATA LABEL ===
export const fetchLabels = createAsyncThunk(
  "cashflows/fetchLabels",
  async ({ token }) => {
    const res = await CashFlowApi.getLabels(token);
    console.log("🏷️ Data label dari API:", res);

    const labels = res?.data?.data || [];
    return labels;
  }
);

/* ========================
   🔹 SLICE
======================== */
const cashflowSlice = createSlice({
  name: "cashflows",
  initialState: {
    data: [],
    labels: [],

    stats: {},
    statsDaily: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---- Fetch semua cashflow ---- */
      .addCase(fetchCashFlows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCashFlows.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.cashFlows || [];
        state.stats = action.payload.stats || {};
        console.log("💾 Cashflows masuk ke Redux:", state.data);
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.labels = action.payload || [];
      })

      .addCase(fetchCashFlows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ---- Statistik Harian ---- */
      .addCase(fetchStatsDaily.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatsDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.statsDaily = action.payload || [];
        console.log("📊 Statistik Harian masuk Redux:", state.statsDaily);
      })
      .addCase(fetchStatsDaily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ---- Tambah / Update / Hapus ---- */
      .addCase(addCashFlow.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCashFlow.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(updateCashFlow.fulfilled, (state, action) => {
        const index = state.data.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      });
  },
});

export default cashflowSlice.reducer;
