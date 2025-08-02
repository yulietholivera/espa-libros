// frontend/vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  logLevel: 'info',

  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],

    // La sección 'build' se elimina por completo


  server: {
    port: 5173,
    proxy: {
      // Proxy para todas las llamadas a la API
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // ❌ SE ELIMINA LA REGLA 'rewrite' QUE CAUSABA EL PROBLEMA
      },
      // Proxy para las imágenes (este puede quedarse como está si funciona)
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

