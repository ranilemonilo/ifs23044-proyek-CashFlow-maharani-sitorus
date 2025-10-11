import React from "react";

const CashFlowForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Tipe Transaksi</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">-- Pilih --</option>
          <option value="inflow">Pemasukan</option>
          <option value="outflow">Pengeluaran</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Sumber Dana</label>
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Label</label>
        <input
          type="text"
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Deskripsi</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Nominal</label>
        <input
          type="number"
          name="nominal"
          value={formData.nominal}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Tanggal Transaksi</label>
        <input
          type="date"
          name="date"
          value={formData.date || ""}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-warning w-100">
        Simpan Perubahan
      </button>
    </form>
  );
};

export default CashFlowForm;
