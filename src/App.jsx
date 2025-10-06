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
import StatsPage from "@/features/cashflows/pages/StatsPage";

// === ROUTE PROTECTOR ===
import PrivateRoute from "@/routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root ke login */}
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* 🔐 AUTH ROUTES */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* 💰 CASHFLOW ROUTES (Hanya bisa diakses jika login) */}
        <Route element={<PrivateRoute />}>
          <Route path="/cashflows" element={<CashFlowLayout />}>
            <Route index element={<CashFlowListPage />} />
            <Route path="add" element={<AddCashFlowPage />} />
            <Route path="edit/:id" element={<EditCashFlowPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
