import React from "react";

const AboutPage = () => {
  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container d-flex justify-content-center">
        <div
          className="card shadow-lg border-0 p-4"
          style={{
            borderRadius: "16px",
            maxWidth: "700px",
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <div className="text-center mb-4">
            <img
              src="/profile-placeholder.png"
              alt="Foto Profil"
              className="shadow-sm"
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #198754",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          <h4 className="text-center fw-bold text-success mb-1">
            Maharani Sitorus
          </h4>
          <p className="text-center text-muted mb-4">
            Mahasiswi Sarjana Informatika – Angkatan 2023
            <br />
            <strong>Institut Teknologi Del</strong>
          </p>

          <div className="row mb-3 px-2">
            <div className="col-6 fw-semibold text-secondary">NIM</div>
            <div className="col-6 text-end">11S23044</div>
          </div>
          <div className="row mb-3 px-2">
            <div className="col-6 fw-semibold text-secondary">
              Program Studi
            </div>
            <div className="col-6 text-end">Sarjana Informatika</div>
          </div>
          <div className="row mb-4 px-2">
            <div className="col-6 fw-semibold text-secondary">Angkatan</div>
            <div className="col-6 text-end">2023</div>
          </div>

          <hr />

          <div className="px-2" style={{ lineHeight: "1.8" }}>
            <p>
              Saya <strong>Maharani Sitorus</strong>, mahasiswi Informatika dari{" "}
              <strong>Institut Teknologi Del</strong>, sedang mengembangkan
              aplikasi <strong>Cash Flow Management</strong> ini sebagai bagian
              dari pembelajaran mata kuliah{" "}
              <strong>Pengembangan Aplikasi Berbasis Web</strong>.
            </p>

            <p>
              Saya percaya bahwa <em>pengelolaan keuangan yang baik</em> adalah
              langkah awal menuju kesuksesan. Aplikasi ini saya rancang agar
              pengguna dapat mencatat, menganalisis, dan memahami kondisi
              keuangannya dengan mudah dan nyaman digunakan.
            </p>

            <p>
              Sebagai calon <strong>software engineer masa depan</strong>, saya
              terus belajar mengasah kemampuan dalam{" "}
              <strong>logika pemrograman</strong>,{" "}
              <strong>desain sistem</strong>, dan{" "}
              <strong>pengembangan web modern</strong>. 💻
            </p>

            <p className="fst-italic text-muted text-center mt-4">
              “Teknologi tidak hanya tentang kode, tetapi tentang solusi nyata
              untuk kehidupan.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
