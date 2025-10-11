// src/features/auth/states/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "@/features/auth/api/AuthApi";

/* ================================
   🔐 Async Thunks (Register & Login)
================================ */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AuthApi.register(formData);

      // Pastikan response ada dan terstruktur
      if (!res || !res.data) {
        throw new Error("Respon server tidak valid");
      }

      return res.data; // biasanya { user, token } atau pesan sukses
    } catch (err) {
      console.error("❌ registerUser error:", err);

      // pastikan error selalu string
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Terjadi kesalahan saat mendaftar"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AuthApi.login(formData);

      if (!res || !res.data) {
        throw new Error("Respon server tidak valid");
      }

      return res.data;
    } catch (err) {
      console.error("❌ loginUser error:", err);
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Terjadi kesalahan saat login"
      );
    }
  }
);

/* ================================
   ⚙️ State Awal
================================ */
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

/* ================================
   🧩 Slice
================================ */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // === REGISTER ===
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        // kalau response tidak mengandung token/user, jangan simpan ke localStorage
        const { user, token } = action.payload || {};
        if (token) localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        state.user = user || null;
        state.token = token || null;
        state.isAuthenticated = !!token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Pendaftaran gagal";
      })

      // === LOGIN ===
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const { user, token } = action.payload || {};
        if (token) localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        state.user = user || null;
        state.token = token || null;
        state.isAuthenticated = !!token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login gagal";
      });
  },
});

/* ================================
   🚀 Export
================================ */
export const { logout } = authSlice.actions;
export default authSlice.reducer;
