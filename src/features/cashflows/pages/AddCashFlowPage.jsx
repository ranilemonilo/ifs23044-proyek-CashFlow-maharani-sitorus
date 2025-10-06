// src/features/cashflows/pages/AddCashFlowPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCashFlow } from "@/features/cashflows/states/cashflowSlice"; // ✅ pakai alias @
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
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await dispatch(addCashFlow({ token, formData: data })).unwrap();
      Swal.fire("Berhasil!", "Data cash flow berhasil ditambahkan.", "success");
      navigate("/cashflows");
    } catch (err) {
      Swal.fire(
        "Gagal!",
        err || "Terjadi kesalahan saat menambah data.",
        "error"
      );
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3 className="mb-4">Tambah Cash Flow</h3>
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
            placeholder="Contoh: gaji / alat-mandi"
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
            placeholder="Contoh: Gaji bulan Oktober / Beli sabun dan shampoo"
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
            placeholder="Masukkan nominal (Rp)"
            value={formData.nominal}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default AddCashFlowPage;
