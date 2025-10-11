import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStatsDaily,
  fetchCashFlows,
} from "@/features/cashflows/states/cashflowSlice";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const StatsPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const {
    statsDaily = [],
    data: cashflows = [],
    loading,
    error,
  } = useSelector((state) => state.cashflows || {});

  useEffect(() => {
    if (token) {
      dispatch(fetchStatsDaily({ token }));
      dispatch(fetchCashFlows({ token }));
    }
  }, [dispatch, token]);

  // === Hitung Statistik Harian ===
  const computedDailyStats = useMemo(() => {
    if (!cashflows || cashflows.length === 0) return [];
    const grouped = cashflows.reduce((acc, item) => {
      const date =
        item.created_at?.split("T")[0] ||
        item.date?.split("T")[0] ||
        "Tanpa Tanggal";
      if (!acc[date]) acc[date] = { date, inflow: 0, outflow: 0 };
      if (item.type === "inflow") acc[date].inflow += Number(item.nominal) || 0;
      if (item.type === "outflow")
        acc[date].outflow += Number(item.nominal) || 0;
      return acc;
    }, {});
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [cashflows]);

  // === Hitung Statistik Bulanan ===
  const computedMonthlyStats = useMemo(() => {
    if (!cashflows || cashflows.length === 0) return [];
    const grouped = cashflows.reduce((acc, item) => {
      const date = new Date(item.created_at || item.date);
      const monthYear = date.toLocaleString("id-ID", {
        month: "short",
        year: "numeric",
      });
      if (!acc[monthYear])
        acc[monthYear] = { month: monthYear, inflow: 0, outflow: 0 };
      if (item.type === "inflow")
        acc[monthYear].inflow += Number(item.nominal) || 0;
      if (item.type === "outflow")
        acc[monthYear].outflow += Number(item.nominal) || 0;
      return acc;
    }, {});
    return Object.values(grouped);
  }, [cashflows]);

  // === Hitung Saldo Harian ===
  const chartDataDaily =
    statsDaily && statsDaily.length > 0 ? statsDaily : computedDailyStats;
  const chartDataWithBalance = useMemo(() => {
    let total = 0;
    return chartDataDaily.map((item) => {
      total += (item.inflow || 0) - (item.outflow || 0);
      return { ...item, balance: total };
    });
  }, [chartDataDaily]);

  const chartDataMonthly = computedMonthlyStats;

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
          📊 Statistik Keuangan
        </h3>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Memuat grafik...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            Terjadi kesalahan: {error}
          </div>
        )}

        {/* === Grafik Harian === */}
        <div
          className="card shadow-sm border-0 mb-4 p-3"
          style={{
            borderRadius: "16px",
            background: "white",
          }}
        >
          <h6 className="fw-bold text-center mb-3 text-primary">
            📅 Pergerakan Harian
          </h6>
          {chartDataDaily.length === 0 ? (
            <p className="text-center text-muted py-4">Tidak ada data.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartDataDaily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`} />
                <Legend />
                <Bar dataKey="inflow" fill="#28a745" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outflow" fill="#dc3545" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* === Grafik Bulanan === */}
        <div
          className="card shadow-sm border-0 mb-4 p-3"
          style={{
            borderRadius: "16px",
            background: "white",
          }}
        >
          <h6 className="fw-bold text-center mb-3 text-primary">
            📆 Rekap Bulanan
          </h6>
          {chartDataMonthly.length === 0 ? (
            <p className="text-center text-muted py-4">Tidak ada data.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartDataMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`} />
                <Legend />
                <Bar dataKey="inflow" fill="#007bff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outflow" fill="#ffc107" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* === Grafik Saldo === */}
        <div
          className="card shadow-sm border-0 p-3"
          style={{
            borderRadius: "16px",
            background: "white",
          }}
        >
          <h6 className="fw-bold text-center mb-3 text-primary">
            💰 Tren Saldo Harian
          </h6>
          {chartDataWithBalance.length === 0 ? (
            <p className="text-center text-muted py-4">Tidak ada data.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartDataWithBalance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#0d6efd"
                  strokeWidth={2.5}
                  dot={false}
                  name="Saldo"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
