// /webapps/espa-libros/frontend/app/components/crud/BookModal/BookModalTrigger.tsx
import React from 'react'
import { PlusIcon } from '@heroicons/react/16/solid'

export interface BookModalTriggerProps {
    onClick: () => void
}

export function BookModalTrigger({ onClick }: BookModalTriggerProps) {
    return (
        <>
            <button 
            type="button" 
            onClick={onClick}
            className="ml-auto flex items-center gap-x-1 rounded-md bg-regal-espalibros px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-regal-espalibros/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                Agregar libro
            </button>
        </>

    )
}