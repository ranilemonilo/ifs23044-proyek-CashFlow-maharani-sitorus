// src/features/cashflows/layouts/CashFlowLayout.jsx
import React, { useState, useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/states/authSlice";
import "@/styles/sidebar.css";
import { ThemeContext } from "@/context/ThemeContext"; // 🌙

const CashFlowLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div
      className={`d-flex ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {/* === SIDEBAR === */}
      <div className={`sidebar ${isOpen ? "open" : "collapsed"} ${theme}`}>
        <div className="text-center mb-4">
          <img src="/logo.png" alt="Logo" className="sidebar-logo" />
          {isOpen && <h5 className="fw-bold mt-2">Cash Flow App</h5>}
        </div>

        <nav className="nav flex-column">
          <NavLink
            to="/cashflows"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""} ${
                theme === "dark" ? "text-light" : "text-dark"
              }`
            }
          >
            📋 {isOpen && "Daftar Transaksi"}
          </NavLink>

          <NavLink
            to="/cashflows/add"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""} ${
                theme === "dark" ? "text-light" : "text-dark"
              }`
            }
          >
            ➕ {isOpen && "Tambah Data"}
          </NavLink>

          <NavLink
            to="/cashflows/stats"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""} ${
                theme === "dark" ? "text-light" : "text-dark"
              }`
            }
          >
            📊 {isOpen && "Statistik Harian"}
          </NavLink>

          <NavLink
            to="/cashflows/labels"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""} ${
                theme === "dark" ? "text-light" : "text-dark"
              }`
            }
          >
            OJOJ 🏷️ {isOpen && "Statistik Label"}
          </NavLink>

          <NavLink
            to="/cashflows/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""} ${
                theme === "dark" ? "text-light" : "text-dark"
              }`
            }
          >
            🙋 {isOpen && "Tentang Saya"}
          </NavLink>

          {/* ✅ Ditaruh di sini supaya sejajar dengan menu lain */}
          <NavLink
            to="/cashflows/settings"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""} ${
                theme === "dark" ? "text-light" : "text-dark"
              }`
            }
          >
            ⚙️ {isOpen && "Pengaturan"}
          </NavLink>

          {isOpen && (
            <button
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              } mt-4 w-100`}
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          )}
        </nav>
      </div>

      {/* === MAIN CONTENT === */}
      <div
        className={`flex-grow-1 ${
          theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        style={{
          marginLeft: isOpen ? "240px" : "80px",
          minHeight: "100vh",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* === HEADER === */}
        <div
          className={`p-2 d-flex justify-content-between align-items-center border-bottom ${
            theme === "dark" ? "bg-secondary" : "bg-white"
          }`}
        >
          <div>
            <button
              className={`btn ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-secondary"
              } me-2`}
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
            <span className="fw-bold">Dashboard</span>
          </div>

          {/* 🌙 Toggle Theme */}
          <button
            onClick={toggleTheme}
            className={`btn ${
              theme === "dark" ? "btn-light" : "btn-dark"
            } rounded-circle`}
            title="Ganti mode tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* === MAIN CONTENT BODY === */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CashFlowLayout;
