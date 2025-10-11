import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCashFlows,
  deleteCashFlow,
} from "@/features/cashflows/states/cashflowSlice";
import Swal from "sweetalert2";

const CashFlowListPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const {
    data = [],
    loading,
    error,
  } = useSelector((state) => state.cashflows || {});

  const [filters, setFilters] = useState({
    type: "",
    sortBy: "date-desc",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (token) dispatch(fetchCashFlows({ token }));
  }, [dispatch, token]);

  // === FILTER + SORT ===
  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (filters.type)
      filtered = filtered.filter((i) => i.type === filters.type);
    if (filters.startDate)
      filtered = filtered.filter(
        (i) => new Date(i.date) >= new Date(filters.startDate)
      );
    if (filters.endDate)
      filtered = filtered.filter(
        (i) => new Date(i.date) <= new Date(filters.endDate)
      );

    switch (filters.sortBy) {
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "nominal-asc":
        filtered.sort((a, b) => a.nominal - b.nominal);
        break;
      case "nominal-desc":
        filtered.sort((a, b) => b.nominal - a.nominal);
        break;
      default:
        break;
    }
    return filtered;
  }, [data, filters]);

  // === HANDLE DELETE ===
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Data?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc3545",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCashFlow({ id, token }))
          .unwrap()
          .then(() => Swal.fire("Berhasil!", "Data telah dihapus.", "success"))
          .catch(() => Swal.fire("Gagal!", "Terjadi kesalahan.", "error"));
      }
    });
  };

  const handleReset = () =>
    setFilters({ type: "", sortBy: "date-desc", startDate: "", endDate: "" });

  // === CALCULATION ===
  const totalInflow = data
    .filter((i) => i.type === "inflow")
    .reduce((sum, i) => sum + i.nominal, 0);
  const totalOutflow = data
    .filter((i) => i.type === "outflow")
    .reduce((sum, i) => sum + i.nominal, 0);
  const balance = totalInflow - totalOutflow;

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "linear-gradient(135deg, #f9fafb 0%, #f1f3f5 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h2 className="fw-bold mb-4 text-secondary text-center">
          💼 Cash Flow Dashboard
        </h2>

        {/* === SUMMARY CARDS === */}
        <div className="row g-4 mb-4 text-center">
          {[
            {
              title: "Pemasukan",
              value: totalInflow,
              color: "linear-gradient(135deg,#28a745,#60c16e)",
              icon: "💰",
            },
            {
              title: "Pengeluaran",
              value: totalOutflow,
              color: "linear-gradient(135deg,#dc3545,#f37b85)",
              icon: "💸",
            },
            {
              title: "Saldo Akhir",
              value: balance,
              color: "linear-gradient(135deg,#0d6efd,#4c8ff7)",
              icon: "📊",
            },
          ].map((card, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="shadow-sm rounded-4 p-4 text-white"
                style={{ background: card.color }}
              >
                <h6 className="opacity-75">
                  {card.icon} {card.title}
                </h6>
                <h3 className="fw-bold mt-1">
                  Rp {card.value.toLocaleString("id-ID")}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* === FILTER BAR === */}
        <div
          className="shadow-sm rounded-4 p-3 mb-4 border-0 d-flex flex-wrap align-items-end justify-content-between"
          style={{
            backgroundColor: "white",
            fontSize: "0.9rem",
            gap: "10px",
          }}
        >
          <div>
            <label className="form-label fw-semibold text-muted mb-1">
              Jenis
            </label>
            <select
              className="form-select form-select-sm"
              style={{ width: 160 }}
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Semua</option>
              <option value="inflow">Pemasukan</option>
              <option value="outflow">Pengeluaran</option>
            </select>
          </div>

          <div>
            <label className="form-label fw-semibold text-muted mb-1">
              Dari
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              style={{ width: 160 }}
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="form-label fw-semibold text-muted mb-1">
              Sampai
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              style={{ width: 160 }}
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="form-label fw-semibold text-muted mb-1">
              Urutkan
            </label>
            <select
              className="form-select form-select-sm"
              style={{ width: 180 }}
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
            >
              <option value="date-desc">Tanggal Terbaru</option>
              <option value="date-asc">Tanggal Terlama</option>
              <option value="nominal-desc">Nominal Terbesar</option>
              <option value="nominal-asc">Nominal Terkecil</option>
            </select>
          </div>

          <div className="text-end">
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={handleReset}
            >
              Reset
            </button>
            <a href="/cashflows/add" className="btn btn-sm btn-primary">
              + Tambah
            </a>
          </div>
        </div>

        {/* === TABLE === */}
        <div className="shadow-sm rounded-4 p-3 bg-white">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead
                className="text-center text-white"
                style={{ backgroundColor: "#0d6efd" }}
              >
                <tr>
                  <th>#</th>
                  <th>Tipe</th>
                  <th>Label</th>
                  <th>Nominal</th>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center text-muted py-4 fs-6"
                    >
                      Tidak ada data ditemukan 🌤️
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, i) => (
                    <tr
                      key={item.id}
                      style={{
                        background:
                          item.type === "inflow" ? "#f0fff4" : "#fff5f5",
                      }}
                    >
                      <td>{i + 1}</td>
                      <td className="text-center">
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            item.type === "inflow"
                              ? "bg-success-subtle text-success"
                              : "bg-danger-subtle text-danger"
                          }`}
                        >
                          {item.type === "inflow" ? "Pemasukan" : "Pengeluaran"}
                        </span>
                      </td>
                      <td className="fw-semibold">{item.label}</td>
                      <td>Rp {item.nominal.toLocaleString("id-ID")}</td>
                      <td>{item.date?.split("T")[0]}</td>
                      <td className="text-muted">{item.description}</td>
                      <td className="text-center">
                        <a
                          href={`/cashflows/detail/${item.id}`}
                          className="btn btn-sm btn-outline-info me-2"
                        >
                          Detail
                        </a>
                        <a
                          href={`/cashflows/edit/${item.id}`}
                          className="btn btn-sm btn-outline-warning me-2"
                        >
                          Edit
                        </a>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowListPage;
