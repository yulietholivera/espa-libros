// frontend/app/components/home/HomePagination.tsx
import React from "react";

interface HomePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function HomePagination({
  currentPage,
  totalPages,
  onPageChange,
}: HomePaginationProps) {
  const createPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const delta = 2; // show current ±2
    let left = Math.max(1, currentPage - delta);
    let right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let p = left; p <= right; p++) {
      pages.push(p);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs bg-regal3-espalibros" aria-label="Pagination">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative border border-gray-500 inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
      >
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Page Numbers */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="relative border border-gray-500 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`relative border border-gray-500 inline-flex items-center px-4 py-2 text-sm font-semibold ${
              p === currentPage
                ? "bg-regal-espalibros text-white z-10"
                : "text-gray-900 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative border border-gray-500 inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
      >
        <span className="sr-only">Next</span>
        <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  );
}
