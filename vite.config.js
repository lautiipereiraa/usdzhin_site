import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@store": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@icons": path.resolve(__dirname, "src/components/icons"),
      "@context": path.resolve(__dirname, "src/context"),
    },
  },
});
