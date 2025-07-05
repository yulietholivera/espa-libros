// /webapps/espa-libros/frontend/app/components/crud/BookModal/BookForm/BookFormActions.tsx

import React from 'react'

export interface BookFormActionsProps {
    onClose: () => void
}

export function BookFormActions({ onClose }: BookFormActionsProps) {
    return (
        <div className="flex justify-end gap-3 pt-2">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
                Cancelar
            </button>
            <button
                type="submit"
                className="px-4 py-2 rounded-md bg-regal-espalibros text-white hover:bg-regal-espalibros/90"
            >
                Guardar
            </button>
        </div>
    )
}

export default BookFormActions
