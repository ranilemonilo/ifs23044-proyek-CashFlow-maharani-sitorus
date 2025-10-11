// src/features/auth/pages/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../states/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      Swal.fire("Berhasil!", "Login berhasil!", "success");
      navigate("/cashflows"); // arahkan ke halaman utama cashflow
    } catch (err) {
      Swal.fire(
        "Gagal!",
        err || "Login gagal, periksa email dan password.",
        "error"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="text-center mb-4">Login</h3>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tombol login */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Sedang login..." : "Masuk"}
        </button>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}

        {/* Link ke register */}
        <div className="text-center mt-3">
          <p className="mb-0">
            Belum punya akun?{" "}
            <a
              href="/auth/register"
              className="text-primary fw-bold text-decoration-none"
            >
              Daftar di sini
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
