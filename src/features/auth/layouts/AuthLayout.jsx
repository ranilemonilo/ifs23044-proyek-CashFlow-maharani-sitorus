// src/features/auth/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{ background: "linear-gradient(135deg, #74ABE2, #5563DE)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ minWidth: "380px", borderRadius: "1rem" }}
      >
        <div className="text-center mb-3">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: 70, marginBottom: 10 }}
          />
          <h4 className="fw-bold text-primary">Aplikasi Cash Flow</h4>
        </div>
        <Outlet />{" "}
        {/* Halaman anak seperti Login / Register akan muncul di sini */}
      </div>
    </div>
  );
};

export default AuthLayout;
