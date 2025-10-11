import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCashFlow } from "@/features/cashflows/states/cashflowSlice";
import CashFlowApi from "@/features/cashflows/api/CashFlowApi";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const EditCashFlowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    type: "inflow",
    source: "cash",
    label: "",
    description: "",
    nominal: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CashFlowApi.getById(id, token);
        const { cash_flow } = res.data;
        setFormData({
          type: cash_flow.type,
          source: cash_flow.source,
          label: cash_flow.label,
          description: cash_flow.description,
          nominal: cash_flow.nominal,
        });
        setLoading(false);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: err?.message || "Terjadi kesalahan saat mengambil data.",
        });
      }
    };
    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCashFlow({ id, token, data: formData })).unwrap();
      Swal.fire("Berhasil!", "Data cash flow berhasil diperbarui.", "success");
      navigate("/cashflows");
    } catch (err) {
      Swal.fire(
        "Gagal!",
        err || "Terjadi kesalahan saat update data.",
        "error"
      );
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5 text-secondary">
        <div className="spinner-border text-success mb-2" role="status"></div>
        <p>Memuat data cash flow...</p>
      </div>
    );

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: 600 }}>
        <div
          className="card shadow-lg border-0 p-4"
          style={{
            borderRadius: "16px",
            backgroundColor: "white",
          }}
        >
          <h4 className="fw-bold text-center text-warning mb-4">
            ✏️ Edit Data Cash Flow
          </h4>

          <form onSubmit={handleSubmit}>
            {/* Tipe Transaksi */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-muted">
                Tipe Transaksi
              </label>
              <select
                name="type"
                className="form-select shadow-sm"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="inflow">Pemasukan</option>
                <option value="outflow">Pengeluaran</option>
              </select>
            </div>

            {/* Sumber Dana */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-muted">
                Sumber Dana
              </label>
              <select
                name="source"
                className="form-select shadow-sm"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="savings">Tabungan</option>
                <option value="loans">Pinjaman</option>
              </select>
            </div>

            {/* Label */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-muted">Label</label>
              <input
                type="text"
                name="label"
                className="form-control shadow-sm"
                placeholder="Contoh: Gaji Bulanan / Belanja Harian"
                value={formData.label}
                onChange={handleChange}
                required
              />
            </div>

            {/* Deskripsi */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-muted">
                Deskripsi
              </label>
              <textarea
                name="description"
                className="form-control shadow-sm"
                rows="2"
                placeholder="Contoh: Gaji bulan Oktober / Beli bahan dapur"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Nominal */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-muted">
                Nominal (Rp)
              </label>
              <input
                type="number"
                name="nominal"
                className="form-control shadow-sm"
                placeholder="Masukkan nominal transaksi"
                value={formData.nominal}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 py-2 fw-semibold shadow-sm"
            >
              💾 Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCashFlowPage;
