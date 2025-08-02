// frontend/app/routes/crud/TableCRUDPage.tsx
'use client'
import { useFetchLibros } from '~/components/crud/TableCRUD/useFetchLibros'
import { LibrosTable } from '~/components/crud/TableCRUD/LibrosTable'
import { TableLoading } from '~/components/crud/TableCRUD/TableLoading'
import { TableError } from '~/components/crud/TableCRUD/TableError'
import BookModal from '~/components/crud/BookModal/BookModal'

export default function TableCRUDPage() {
  const { libros, loading, error, refresh } = useFetchLibros({ admin: true })

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este libro?')) return
    try {
      const token = localStorage.getItem('token')
      const base = import.meta.env.VITE_API_URL.replace(/\/$/, '')
      const res = await fetch(`${base}/admin/libros/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      await refresh()
    } catch {
      alert('No se pudo eliminar el libro')
    }
  }

  return (
    <>
      {/* 1. Botón + modal para CREAR libro */}
      {/* <BookModal onClose={refresh} /> */}

      {/* 2. Estados */}
      {loading && <TableLoading />}
      {error   && <TableError message={error} />}

      {/* 3. Tabla con refresco en editar/eliminar */}
      <LibrosTable
        libros={libros}
        onDelete={handleDelete}
        onRefresh={refresh}
      />
    </>
  )
}