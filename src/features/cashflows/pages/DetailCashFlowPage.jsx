// src/features/cashflows/pages/DetailCashFlowPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CashFlowApi from "@/features/cashflows/api/CashFlowApi";
import Swal from "sweetalert2";

const DetailCashFlowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await CashFlowApi.getById(id, token);
        console.log("✅ Detail Response:", res);
        // sesuai struktur API kamu
        setData(res.data?.cash_flow || res.data || res);
      } catch (err) {
        Swal.fire("Gagal", "Tidak bisa memuat detail cash flow.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, token]);

  if (loading) return <p className="text-center mt-5">⏳ Memuat detail...</p>;
  if (!data)
    return (
      <p className="text-center mt-5 text-danger">Data tidak ditemukan.</p>
    );

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h3 className="mb-4 text-center">Detail Cash Flow</h3>
      <div className="card shadow-sm p-4">
        <p>
          <strong>ID:</strong> {data.id}
        </p>
        <p>
          <strong>Tipe:</strong>{" "}
          {data.type === "inflow" ? "Pemasukan" : "Pengeluaran"}
        </p>
        <p>
          <strong>Sumber:</strong> {data.source}
        </p>
        <p>
          <strong>Label:</strong> {data.label}
        </p>
        <p>
          <strong>Deskripsi:</strong> {data.description}
        </p>
        <p>
          <strong>Nominal:</strong> Rp {data.nominal?.toLocaleString("id-ID")}
        </p>
        <p>
          <strong>Dibuat pada:</strong>{" "}
          {new Date(data.created_at).toLocaleString()}
        </p>
        <div className="text-center">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCashFlowPage;
