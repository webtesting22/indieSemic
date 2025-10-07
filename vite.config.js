import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "8ca2-2401-4900-8899-9604-7c4c-7f78-fa67-325d.ngrok-free.app",
    ],
    port: 3002,
  },
});
