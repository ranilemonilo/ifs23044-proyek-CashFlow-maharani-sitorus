// src/store.js
import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import authReducer from "@/features/auth/states/authSlice";
// nanti kalau sudah ada cashflows & users, tinggal tambahkan di sini

import cashflowReducer from "@/features/cashflows/states/cashflowSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cashflows: cashflowReducer,
    // users: userReducer,
  },
});

export default store;
