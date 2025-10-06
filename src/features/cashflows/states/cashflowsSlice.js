// src/features/cashflows/states/cashflowSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CashFlowApi from "@/features/cashflows/api/CashFlowApi";

export const fetchCashFlows = createAsyncThunk(
  "cashflows/fetchCashFlows",
  async ({ token }) => {
    const response = await CashFlowApi.getAll(token);
    return response.data.data;
  }
);

export const addCashFlow = createAsyncThunk(
  "cashflows/addCashFlow",
  async ({ token, formData }) => {
    const response = await CashFlowApi.create(token, formData);
    return response.data.data;
  }
);

export const deleteCashFlow = createAsyncThunk(
  "cashflows/deleteCashFlow",
  async ({ id, token }) => {
    await CashFlowApi.delete(id, token);
    return id;
  }
);

const cashflowSlice = createSlice({
  name: "cashflows",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCashFlows.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCashFlows.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCashFlows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCashFlow.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteCashFlow.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default cashflowSlice.reducer;
