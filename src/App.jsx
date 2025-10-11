// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// === AUTH ===
import AuthLayout from "@/features/auth/layouts/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

// === CASHFLOW ===
import CashFlowLayout from "@/features/cashflows/layouts/CashFlowLayout";
import CashFlowListPage from "@/features/cashflows/pages/CashFlowListPage";
import AddCashFlowPage from "@/features/cashflows/pages/AddCashFlowPage";
import EditCashFlowPage from "@/features/cashflows/pages/EditCashFlowPage";
import DetailCashFlowPage from "@/features/cashflows/pages/DetailCashFlowPage";
import StatsPage from "@/features/cashflows/pages/StatsPage";
import LabelStatsPage from "@/features/cashflows/pages/LabelStatsPage";
import AboutPage from "@/features/cashflows/pages/AboutPage";
import SettingsPage from "@/features/cashflows/pages/SettingsPage";

// === ROUTE PROTECTOR ===
import PrivateRoute from "@/routes/PrivateRoute";

console.log("✅ App.jsx loaded!");

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root ke login */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        {/* =====================
            🔐 AUTH ROUTES
        ====================== */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* =====================
            💰 CASHFLOW ROUTES (Protected)
        ====================== */}
        <Route element={<PrivateRoute />}>
          <Route path="/cashflows" element={<CashFlowLayout />}>
            <Route index element={<CashFlowListPage />} />
            <Route path="add" element={<AddCashFlowPage />} />
            <Route path="edit/:id" element={<EditCashFlowPage />} />
            <Route path="detail/:id" element={<DetailCashFlowPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="labels" element={<LabelStatsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Jika route tidak ditemukan */}
        <Route
          path="*"
          element={
            <div className="text-center mt-5">
              <h2>404 - Halaman Tidak Ditemukan</h2>
              <a href="/" className="btn btn-primary mt-3">
                Kembali ke Beranda
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

console.log("✅ App Loaded");

export default App;
