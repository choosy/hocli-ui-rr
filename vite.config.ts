import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), reactRouter()],
  server: {
    allowedHosts: ["stefan.local.hocli.com"],
    hmr: {
      host: "192.168.1.150",
      port: 5173,
    },
  },
});
