// src/features/auth/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../states/authSlice";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();

      Swal.fire({
        title: "Berhasil!",
        text: "Pendaftaran berhasil. Silakan login.",
        icon: "success",
        confirmButtonColor: "#28a745",
      });

      navigate("/auth/login");
    } catch (err) {
      console.error("❌ Error saat register:", err);

      // Pastikan error yang dikirim ke SweetAlert berupa string, bukan object
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message ||
            err?.response?.data?.message ||
            "Terjadi kesalahan saat mendaftar.";

      Swal.fire({
        title: "Gagal!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div>
      <h4 className="text-center mb-4">Daftar Akun Baru</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>

        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}

        <div className="text-center mt-3">
          <small>
            Sudah punya akun?{" "}
            <Link to="/auth/login" className="text-decoration-none">
              Masuk di sini
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
