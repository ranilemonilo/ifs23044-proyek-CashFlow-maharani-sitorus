import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Untuk ES module agar bisa pakai __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // Ambil semua variable dari .env (termasuk VITE_DELCOM_BASEURL)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    // 📦 Folder hasil build harus "dist" (Vercel mengenali ini otomatis)
    build: {
      outDir: "dist",
      sourcemap: false,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000, // (opsional) hilangkan warning file besar
    },

    // 🌐 Untuk resolve path @/
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // 🧩 Define variabel agar bisa digunakan di seluruh app
    define: {
      "process.env": {}, // hindari error undefined process.env
      "import.meta.env.VITE_DELCOM_BASEURL": JSON.stringify(
        env.VITE_DELCOM_BASEURL || "https://open-api.delcom.org/api/v1"
      ),
    },

    // ⚙️ Optimize dependencies (supaya build cepat)
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "redux",
        "react-redux",
      ],
    },

    // 💻 Setting dev server (untuk lokal)
    server: {
      port: 5173,
      open: true,
    },
  };
});
