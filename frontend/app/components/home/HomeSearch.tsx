// frontend/app/components/home/HomeSearch.tsx
import { useState, KeyboardEvent, ChangeEvent } from "react";

interface HomeSearchProps {
  /** Se dispara cuando el usuario presiona Enter */
  onSearch: (query: string) => void;
}

export default function HomeSearch({ onSearch }: HomeSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative mb-6 max-w-lg mx-auto">
      <input
        type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar libros…"
        aria-label="Buscar libros"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-regal-espalibros focus:border-regal-espalibros"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
    </div>
  );
}
