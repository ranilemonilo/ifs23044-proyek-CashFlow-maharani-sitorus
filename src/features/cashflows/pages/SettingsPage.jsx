import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { ThemeContext } from "@/context/ThemeContext";

const SettingsPage = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Kata sandi baru dan konfirmasi tidak cocok.",
      });
    }

    try {
      setIsChanging(true);
      // 🕐 Simulasi API ubah password
      await new Promise((resolve) => setTimeout(resolve, 1200));

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Kata sandi berhasil diubah.",
      });

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengganti kata sandi.",
      });
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div
      className={`container py-4 ${
        theme === "dark" ? "text-light" : "text-dark"
      }`}
      style={{ maxWidth: 800 }}
    >
      <h3 className="fw-bold mb-4 text-center">⚙️ Pengaturan Akun</h3>

      {/* === GANTI PASSWORD === */}
      <div
        className={`card shadow-sm border-0 mb-4 ${
          theme === "dark" ? "bg-secondary text-light" : "bg-white"
        }`}
      >
        <div
          className={`card-header fw-semibold ${
            theme === "dark" ? "bg-dark text-light" : "bg-primary text-white"
          }`}
        >
          🔒 Ganti Kata Sandi
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Kata Sandi Saat Ini</label>
              <input
                type="password"
                className="form-control"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kata Sandi Baru</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Konfirmasi Kata Sandi Baru</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isChanging}
            >
              {isChanging ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </div>

      {/* === PREFERENSI TAMPILAN === */}
      <div
        className={`card shadow-sm border-0 ${
          theme === "dark" ? "bg-secondary text-light" : "bg-white"
        }`}
      >
        <div
          className={`card-header fw-semibold ${
            theme === "dark" ? "bg-dark text-light" : "bg-secondary text-white"
          }`}
        >
          🌓 Preferensi Tampilan
        </div>
        <div className="card-body">
          <p className="text-muted mb-0">
            Kamu dapat mengganti mode gelap / terang dengan tombol 🌙 di pojok
            kanan atas dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
