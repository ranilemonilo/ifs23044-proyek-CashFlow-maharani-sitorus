import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCashFlow,
  fetchCashFlows,
} from "@/features/cashflows/states/cashflowSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCashFlowPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    type: "inflow",
    source: "cash",
    label: "",
    description: "",
    nominal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const today = new Date().toISOString().split("T")[0];
      const payload = {
        ...formData,
        nominal: Number(formData.nominal),
        date: today,
      };

      await dispatch(addCashFlow({ token, formData: payload })).unwrap();
      Swal.fire(
        "✅ Berhasil!",
        "Data cash flow berhasil ditambahkan.",
        "success"
      );
      await dispatch(fetchCashFlows({ token }));
      navigate("/cashflows");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: err?.message || "Terjadi kesalahan saat menambah data.",
      });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2f3 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "100%", maxWidth: "550px" }}
      >
        <div className="text-center mb-4">
          <div
            className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: 70,
              height: 70,
              background: "linear-gradient(135deg, #28a745, #4cd964)",
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            +
          </div>
          <h3 className="fw-bold text-secondary">Tambah Transaksi Baru</h3>
          <p className="text-muted small">
            Catat transaksi keuangan Anda dengan mudah dan cepat 💸
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* === Tipe Transaksi === */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-muted">
              Jenis Transaksi
            </label>
            <select
              name="type"
              className="form-select rounded-3 shadow-sm"
              value={formData.type}
              onChange={handleChange}
              style={{ borderColor: "#dee2e6" }}
            >
              <option value="inflow">💰 Pemasukan</option>
              <option value="outflow">💸 Pengeluaran</option>
            </select>
          </div>

          {/* === Sumber Dana === */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-muted">
              Sumber Dana
            </label>
            <select
              name="source"
              className="form-select rounded-3 shadow-sm"
              value={formData.source}
              onChange={handleChange}
            >
              <option value="cash">💵 Cash</option>
              <option value="savings">🏦 Tabungan</option>
              <option value="loans">💳 Pinjaman</option>
            </select>
          </div>

          {/* === Label === */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-muted">Label</label>
            <input
              type="text"
              name="label"
              className="form-control rounded-3 shadow-sm"
              placeholder="Contoh: Gaji / Belanja mingguan"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </div>

          {/* === Deskripsi === */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-muted">
              Deskripsi
            </label>
            <textarea
              name="description"
              className="form-control rounded-3 shadow-sm"
              placeholder="Contoh: Gaji bulan Oktober / Beli kebutuhan mandi"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* === Nominal === */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-muted">Nominal</label>
            <div className="input-group shadow-sm rounded-3">
              <span className="input-group-text bg-light text-secondary">
                Rp
              </span>
              <input
                type="number"
                name="nominal"
                className="form-control"
                placeholder="Masukkan jumlah (contoh: 100000)"
                value={formData.nominal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-semibold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #28a745, #4cd964)",
              border: "none",
            }}
          >
            💾 Simpan Transaksi
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary w-100 mt-2"
            onClick={() => navigate("/cashflows")}
          >
            ← Kembali
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCashFlowPage;
