// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  // Kalau belum login → arahkan ke halaman login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Kalau sudah login → tampilkan halaman yang diminta
  return <Outlet />;
};

export default PrivateRoute;
