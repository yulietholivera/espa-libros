// frontend/app/components/home/LoadingState.tsx
import React from "react";

interface LoadingStateProps {
  loading: boolean;
  error: string | null;
}

/**
 * Muestra un estado de carga ("Cargando…") y
 *, en caso de error, un mensaje de error.
 */
export default function LoadingState({
  loading,
  error,
}: LoadingStateProps) {
  if (loading) {
    return (
      <div className="py-8 text-center text-lg text-gray-700">
        Cargando libros…
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-lg text-red-600">
        Error: {error}
      </div>
    );
  }

  return null;
}
