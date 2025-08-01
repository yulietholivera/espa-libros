// frontend/app/components/crud/PanelHeader.tsx
import React from 'react'
import { Link } from "react-router"
import Logo from '../../assets/logo.svg'
import BookModal from './BookModal/BookModal'

export interface PanelHeaderProps {
  onAdd: () => void
}

export function PanelHeader({ onAdd }: PanelHeaderProps) {
  return (
    <header className="pt-6 pb-4 sm:pb-6">
      <div className="flex justify-between items-center mb-4">
        <Link to="/"><img src={Logo} alt="Espa-Libros Logo" /></Link>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4">
        <h1 className="text-2xl font-semibold text-regal-espalibros">Flujo de caja</h1>
        {/* Aquí podrías poner más info / estadísticas */}
      </div>
      {/* Botón que abre el modal de creación */}
      <BookModal onClose={onAdd} />
    </header>
  )
}
