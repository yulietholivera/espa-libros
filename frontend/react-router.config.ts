// frontend/react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  // Le indicamos explícitamente el directorio de salida
  buildDirectory: "build/client",

  // Mantenemos tu configuración de SPA
  ssr: false,
} satisfies Config;