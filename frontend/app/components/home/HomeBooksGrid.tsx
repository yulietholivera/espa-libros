// frontend/app/components/home/HomeBooksGrid.tsx
import type { Libro } from "./useLibros";
import BookCard from "./BookCard";

interface HomeBooksGridProps {
  /** Array de libros a mostrar en el grid */
  libros: Libro[];
}

export default function HomeBooksGrid({ libros }: HomeBooksGridProps) {
  if (libros.length === 0) {
    return <p className="text-center text-gray-500">No se encontraron libros.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-5 md:gap-y-0 lg:gap-x-8">
      {libros.map((libro) => (
        <BookCard key={libro._id} libro={libro} />
      ))}
    </div>
  );
}
