// src/features/cashflows/layouts/CashFlowLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/states/authSlice";

const CashFlowLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 vh-100"
        style={{ width: "240px", position: "fixed" }}
      >
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "60px", marginBottom: "10px" }}
          />
          <h5 className="fw-bold">Cash Flow App</h5>
        </div>

        <nav className="nav flex-column">
          <NavLink
            to="/cashflows"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
            }
          >
            📋 Daftar Transaksi
          </NavLink>

          <NavLink
            to="/cashflows/add"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
            }
          >
            ➕ Tambah Data
          </NavLink>

          <NavLink
            to="/cashflows/stats"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
            }
          >
            📊 Statistik
          </NavLink>

          <button className="btn btn-outline-light mt-4" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 bg-light"
        style={{ marginLeft: "240px", minHeight: "100vh" }}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CashFlowLayout;
