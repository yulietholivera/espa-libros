// /frontend/app/components/checkout/CheckoutItem.tsx
import React from 'react';

// En un futuro, este tipo vendría de tus definiciones de API o modelos de datos
interface CartItem {
  id: number;
  name: string;
  description: string;
  details: string[];
  price: number;
  imageSrc: string;
  imageAlt: string;
}

interface CheckoutItemProps {
  item: CartItem;
}

export function CheckoutItem({ item }: CheckoutItemProps) {
  return (
    <li className="flex px-4 py-6 sm:px-6">
      <div className="shrink-0">
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          className="w-24 rounded-md" // Ancho ajustado para mejor visualización
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">
              <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                {item.name}
              </a>
            </h4>
            {item.details.map((detail, index) => (
              <p key={index} className="mt-1 text-sm text-gray-500">
                {detail}
              </p>
            ))}
          </div>

          <div className="ml-4 flow-root shrink-0">
            <button
              type="button"
              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Remove</span>
              <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between pt-2">
          <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>

          <div className="ml-4 grid grid-cols-1">
            <select
              id={`quantity-${item.id}`}
              name={`quantity-${item.id}`}
              aria-label="Quantity"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6"
            >
              {[...Array(8).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <svg
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 sm:size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </li>
  );
}
