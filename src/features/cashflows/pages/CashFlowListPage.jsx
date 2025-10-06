// src/features/cashflows/pages/CashFlowListPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCashFlows,
  deleteCashFlow,
} from "@/features/cashflows/states/cashflowSlice"; // ✅ pakai alias @
import Swal from "sweetalert2";

const CashFlowListPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.cashflows);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchCashFlows({ token }));
    }
  }, [dispatch, token]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Data?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCashFlow({ id, token }))
          .unwrap()
          .then(() => Swal.fire("Berhasil!", "Data telah dihapus.", "success"))
          .catch(() => Swal.fire("Gagal!", "Terjadi kesalahan.", "error"));
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Daftar Cash Flow</h3>
        <a href="/cashflows/add" className="btn btn-primary">
          + Tambah
        </a>
      </div>

      {loading && <p>🔄 Memuat data...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && data.length === 0 && <p>Tidak ada data cash flow.</p>}

      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tipe</th>
            <th>Sumber</th>
            <th>Label</th>
            <th>Deskripsi</th>
            <th>Nominal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>
                {item.type === "inflow" ? (
                  <span className="badge bg-success">Pemasukan</span>
                ) : (
                  <span className="badge bg-danger">Pengeluaran</span>
                )}
              </td>
              <td>{item.source}</td>
              <td>{item.label}</td>
              <td>{item.description}</td>
              <td>Rp {item.nominal.toLocaleString("id-ID")}</td>
              <td>
                <a
                  href={`/cashflows/edit/${item.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </a>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashFlowListPage;
