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
  build: {
    // Much smaller chunks for iOS Safari memory limits
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Aggressive code splitting for iOS Safari
        manualChunks: (id) => {
          // Core React libraries - smallest possible chunks
          if (id.includes("react-dom")) return "react-dom";
          if (id.includes("react") && !id.includes("react-dom")) return "react";

          // Router separate from React
          if (id.includes("react-router")) return "router";

          // Break up Ant Design into smaller chunks
          if (id.includes("antd")) {
            if (id.includes("table") || id.includes("form"))
              return "antd-heavy";
            return "antd-core";
          }

          // Material UI separate chunks
          if (id.includes("@mui/material")) return "mui-material";
          if (id.includes("@mui/icons-material")) return "mui-icons";

          // Heavy libraries get their own chunks
          if (id.includes("swiper")) return "swiper";
          if (id.includes("html2canvas")) return "html2canvas";
          if (id.includes("jspdf")) return "jspdf";

          // Icons separated by type
          if (id.includes("react-icons/fa")) return "icons-fa";
          if (id.includes("react-icons/md")) return "icons-md";
          if (id.includes("react-icons/fi")) return "icons-fi";
          if (id.includes("react-icons")) return "icons-other";

          // PrimeReact components
          if (id.includes("primereact")) return "primereact";

          // Chart libraries
          if (id.includes("chart") || id.includes("d3")) return "charts";

          // CRITICAL: Handle the massive country-state-city library
          if (id.includes("country-state-city")) {
            return "country-data"; // Isolate this 8.6MB monster
          }

          // Date/time libraries
          if (
            id.includes("moment") ||
            id.includes("dayjs") ||
            id.includes("date-fns")
          )
            return "datetime";

          // Utils and lodash
          if (id.includes("lodash") || id.includes("ramda")) return "utils";

          // CSS and styling
          if (id.includes(".css") || id.includes("styled")) return "styles";

          // Node modules that aren't specifically handled
          if (id.includes("node_modules")) {
            const moduleName = id.split("node_modules/")[1].split("/")[0];
            // Group small modules together
            if (moduleName.length < 6) return "small-modules";
            return `vendor-${moduleName.substring(0, 8)}`;
          }

          // App code splitting by directory
          if (id.includes("/Components/")) {
            const componentPath = id.split("/Components/")[1];
            const componentName = componentPath.split("/")[0];
            return `component-${componentName.toLowerCase()}`;
          }

          if (id.includes("/StoreComponents/")) return "store-components";
          if (id.includes("/HomeRoutes/")) return "home-routes";
          if (id.includes("/Routes/")) return "app-routes";
          if (id.includes("/utils/")) return "app-utils";
          if (id.includes("/hooks/")) return "app-hooks";

          // Default chunk for remaining code
          return "app-main";
        },

        // Optimize chunk file names for caching
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",

        // Ensure small chunks for better loading
        experimentalMinChunkSize: 20000, // 20KB minimum
      },
    },

    // iOS Safari optimizations
    target: ["es2015", "safari11"],

    // More aggressive minification
    minify: "terser",
    terserOptions: {
      compress: {
        // Aggressive compression for iOS Safari
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.warn", "console.info"],
        unsafe: true,
        unsafe_comps: true,
        passes: 2, // Multiple passes for better compression
        keep_fnames: false,
        keep_classnames: false,
      },
      mangle: {
        safari10: true, // Safari-specific mangling
      },
    },

    // Split CSS into smaller chunks too
    cssCodeSplit: true,

    // Reduce asset inline threshold
    assetsInlineLimit: 1024, // Even smaller inline limit for iOS Safari

    // Aggressive asset optimization for iOS Safari
    assetsInclude: [
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.svg",
      "**/*.webp",
    ],
  },

  // Optimize dependencies for iOS Safari
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    // Force optimization of problematic deps
    force: true,
  },
});
