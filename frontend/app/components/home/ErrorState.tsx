// frontend/app/components/home/ErrorState.tsx
import React from "react";

interface ErrorStateProps {
  error: string;
}

/**
 * Muestra un mensaje de error centrado en pantalla.
 */
export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="py-8 text-center">
      <p className="text-lg font-medium text-red-600">
        ¡Vaya! Ha ocurrido un error:
      </p>
      <p className="mt-2 text-sm text-red-500">{error}</p>
    </div>
  );
}