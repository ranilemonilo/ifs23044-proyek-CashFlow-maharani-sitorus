// src/features/cashflows/pages/StatsPage.jsx
import React, { useEffect, useState } from "react";
import CashFlowApi from "@/features/cashflows/api/CashFlowApi"; // ✅ alias @ sudah benar
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatsPage = () => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.auth);

  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const daily = await CashFlowApi.getStatsDaily(token);
        const monthly = await CashFlowApi.getStatsMonthly(token);

        // Ubah object data dari API menjadi array untuk Recharts
        const dailyStats = Object.keys(daily.data.stats_cashflow || {}).map(
          (key) => ({
            date: key,
            inflow: daily.data.stats_inflow[key],
            outflow: daily.data.stats_outflow[key],
            cashflow: daily.data.stats_cashflow[key],
          })
        );

        const monthlyStats = Object.keys(monthly.data.stats_cashflow || {}).map(
          (key) => ({
            month: key,
            inflow: monthly.data.stats_inflow[key],
            outflow: monthly.data.stats_outflow[key],
            cashflow: monthly.data.stats_cashflow[key],
          })
        );

        setDailyData(dailyStats);
        setMonthlyData(monthlyStats);
      } catch (error) {
        console.error("Gagal memuat statistik:", error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📈 Statistik Cash Flow</h3>

      {/* Grafik Harian */}
      <div className="mb-5">
        <h5 className="mb-3">Statistik Harian</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="inflow"
              stroke="#00c853"
              name="Pemasukan"
            />
            <Line
              type="monotone"
              dataKey="outflow"
              stroke="#d50000"
              name="Pengeluaran"
            />
            <Line
              type="monotone"
              dataKey="cashflow"
              stroke="#2962ff"
              name="Saldo Bersih"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Grafik Bulanan */}
      <div>
        <h5 className="mb-3">Statistik Bulanan</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="inflow"
              stroke="#00c853"
              name="Pemasukan"
            />
            <Line
              type="monotone"
              dataKey="outflow"
              stroke="#d50000"
              name="Pengeluaran"
            />
            <Line
              type="monotone"
              dataKey="cashflow"
              stroke="#2962ff"
              name="Saldo Bersih"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPage;
