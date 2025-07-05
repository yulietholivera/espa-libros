// /webapps/espa-libros/frontend/app/components/crud/PanelHeader.tsx
import React from 'react'
// import { AddBookButton } from './AddBookButton'
import { Link } from "react-router";

import Logo from '../../assets/logo.svg';
import BookModal from './BookModal/BookModal'

export function PanelHeader() {
  return (
    <>
      <header className="pt-6 pb-4 sm:pb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="mb-2">
            <Link to="/">
                                <img src={Logo} alt="Espa-Libros Logo" />
                            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap  ">
          <h1 className="text-2xl font-semibold text-regal-espalibros">Flujo de caja</h1>
          <div
            className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
          </div>
        </div>
        {/* Botón que abre el modal */}
        <BookModal />
        {/* <ModalDialogs /> */}
      </header>
    </>
  )
}