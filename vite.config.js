import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
      sourcemap: false,
      emptyOutDir: true,
    },

    // ✅ Gabungkan SEMUA define jadi satu
    define: {
      "process.env": {},
      DELCOM_BASEURL: JSON.stringify(
        env.VITE_DELCOM_BASEURL || "https://open-api.delcom.org/api/v1"
      ),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "redux",
        "react-redux",
      ],
    },

    server: {
      port: 5173,
      open: true,
    },
  };
});
