import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Pastikan __dirname bisa digunakan di ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ambil semua variable dari .env sesuai mode (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      outDir: "public_html", // folder hasil build
    },
    define: {
      // inject base URL dari environment variable
      DELCOM_BASEURL: JSON.stringify(env.VITE_DELCOM_BASEURL || ""),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // agar import @/... dikenali
      },
    },
  };
});
