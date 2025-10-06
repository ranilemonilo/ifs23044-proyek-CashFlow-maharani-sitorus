// src/features/cashflows/pages/EditCashFlowPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCashFlow } from "@/features/cashflows/states/cashflowSlice"; // ✅ pakai alias @
import CashFlowApi from "@/features/cashflows/api/CashFlowApi"; // ✅ pakai alias @
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

  // 🟢 Ambil data cashflow berdasarkan ID
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
        Swal.fire(
          "Gagal!",
          "Data tidak ditemukan atau error koneksi.",
          "error"
        );
        navigate("/cashflows");
      }
    };

    fetchData();
  }, [id, token, navigate]);

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

  if (loading) return <p className="text-center mt-5">Memuat data...</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3 className="mb-4">Edit Cash Flow</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipe Transaksi</label>
          <select
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="inflow">Pemasukan</option>
            <option value="outflow">Pengeluaran</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Sumber Dana</label>
          <select
            name="source"
            className="form-select"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="cash">Cash</option>
            <option value="savings">Tabungan</option>
            <option value="loans">Pinjaman</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Label</label>
          <input
            type="text"
            name="label"
            className="form-control"
            value={formData.label}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            name="description"
            className="form-control"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Nominal</label>
          <input
            type="number"
            name="nominal"
            className="form-control"
            value={formData.nominal}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditCashFlowPage;
