import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCashFlows } from "@/features/cashflows/states/cashflowSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4caf50", // green
  "#f44336", // red
  "#ffb300", // yellow
  "#2196f3", // blue
  "#9c27b0", // purple
  "#00bcd4", // cyan
  "#ff9800", // orange
  "#8bc34a", // light green
];

const LabelStatsPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { data: cashflows = [], loading } = useSelector(
    (state) => state.cashflows || {}
  );

  // 🔹 Ambil data cashflow
  useEffect(() => {
    if (token) dispatch(fetchCashFlows({ token }));
  }, [dispatch, token]);

  // 🔹 Kelompokkan berdasarkan label
  const labelData = useMemo(() => {
    if (!cashflows || cashflows.length === 0) return [];

    const grouped = cashflows.reduce((acc, item) => {
      const label = item.label?.trim() || "Tanpa Label";
      if (!acc[label]) acc[label] = 0;
      acc[label] += item.nominal || 0;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, total]) => ({
      name,
      total,
    }));
  }, [cashflows]);

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h3 className="fw-semibold text-center mb-4 text-secondary">
          🏷️ Statistik Berdasarkan Label
        </h3>

        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Memuat data...</p>
          </div>
        )}

        {labelData.length === 0 ? (
          <p className="text-center text-muted mt-4">
            Tidak ada data label yang tersedia 📭
          </p>
        ) : (
          <div className="row g-4">
            {/* === Chart Card === */}
            <div className="col-lg-6 col-md-12">
              <div
                className="card shadow-sm border-0 p-4"
                style={{ borderRadius: "16px" }}
              >
                <h6 className="fw-bold text-center text-primary mb-3">
                  📊 Diagram Donat per Label
                </h6>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={labelData}
                      dataKey="total"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={4}
                      labelLine={false}
                      label={({ name }) => name}
                    >
                      {labelData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* === Table Card === */}
            <div className="col-lg-6 col-md-12">
              <div
                className="card shadow-sm border-0 p-4"
                style={{
                  borderRadius: "16px",
                  height: "100%",
                  backgroundColor: "white",
                }}
              >
                <h6 className="fw-bold text-center text-primary mb-3">
                  📋 Daftar Total Nominal per Label
                </h6>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead
                      className="table-light"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <tr>
                        <th>Label</th>
                        <th className="text-end">Total (Rp)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labelData.map((item, i) => (
                        <tr key={i}>
                          <td className="fw-medium">{item.name}</td>
                          <td className="text-end text-success">
                            Rp {item.total.toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelStatsPage;
