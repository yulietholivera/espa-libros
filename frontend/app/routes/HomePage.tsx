// frontend/app/routes/HomePage.tsx
import React, { useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeSearch from "../components/home/HomeSearch";
import LoadingState from "../components/home/LoadingState";
import ErrorState from "../components/home/ErrorState";
import HomeSectionTitle from "../components/home/HomeSectionTitle";
import HomeBooksGrid from "../components/home/HomeBooksGrid";
import HomePagination from "../components/home/HomePagination";
import useLibros from "../components/home/useLibros";

export default function HomePage() {
  const { libros, loading, error } = useLibros();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // filtrar por búsqueda
  const filtered = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 25;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const displayed = filtered.slice(start, start + itemsPerPage);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-regal2-espalibros min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <HomeHeader />

        <HomeSearch onSearch={handleSearch} />

        <LoadingState loading={loading} error={error} />
        {(!loading && error) && <ErrorState error={error!} />}

        {!loading && !error && (
          <>
            <HomeSectionTitle text="Libros más leídos de la semana" />

            <HomeBooksGrid libros={displayed} />

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <HomePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
