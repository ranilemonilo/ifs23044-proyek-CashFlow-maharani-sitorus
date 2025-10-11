import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Pastikan __dirname bisa digunakan di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ambil semua variable dari .env (VITE_*)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    // 📦 Folder hasil build harus "dist" agar bisa dikenali oleh Vercel
    build: {
      outDir: "dist",
      sourcemap: false,
      emptyOutDir: true,
    },

    // 🔧 Define variable environment agar bisa dipakai di seluruh app
    define: {
      DELCOM_BASEURL: JSON.stringify(env.VITE_DELCOM_BASEURL || ""),
    },

    // 🛣️ Alias biar bisa pakai @/ untuk import path
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // ⚙️ Optional: optimize dependencies agar build lebih cepat
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "redux",
        "react-redux",
      ],
    },

    // 🌐 Server setting (untuk local dev)
    server: {
      port: 5173,
      open: true,
    },
    define: {
      "process.env": {}, // hindari error env undefined
      DELCOM_BASEURL: JSON.stringify(
        loadEnv(mode, process.cwd(), "").VITE_DELCOM_BASEURL ||
          "https://open-api.delcom.org/api/v1"
      ),
    },
  };
});
