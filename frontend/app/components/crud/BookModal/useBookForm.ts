// frontend/app/components/crud/BookModal/useBookForm.ts
import { useState } from 'react'
import type { Libro } from '~/components/crud/TableCRUD/useFetchLibros'

export interface BookData {
  titulo: string
  autor: string
  descripcion: string
  precio: number | null
  stock: number | null
  categoria: string
  imagenFile: File | null
}

export function useBookForm(onSuccess: () => void, libroInicial?: Libro) {
  const [data, setData] = useState<BookData>({
    titulo: '',
    autor: '',
    descripcion: '',
    precio: null,
    stock: null,
    categoria: '',
    imagenFile: null,
  })

  const API = import.meta.env.VITE_API_URL
  const isEdit = !!libroInicial

  function handleChange<K extends keyof BookData>(key: K, value: BookData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function setDataFromLibro(libro: Libro) {
    setData({
      titulo: libro.titulo,
      autor: libro.autor || '',
      descripcion: libro.descripcion || '',
      precio: libro.precio,
      stock: libro.stock,
      categoria: libro.categoria || '',
      imagenFile: null, // ⚠️ no se puede precargar una imagen File
    })
  }

  async function submit() {
    const formData = new FormData()
    formData.append('titulo', data.titulo)
    formData.append('autor', data.autor)
    formData.append('descripcion', data.descripcion)
    formData.append('precio', data.precio?.toString() ?? '0')
    formData.append('stock', data.stock?.toString() ?? '0')
    formData.append('categoria', data.categoria)

    if (data.imagenFile) {
      formData.append('imagenPortada', data.imagenFile)
    }

    const token = localStorage.getItem('token')
    const endpoint = isEdit
      ? `${API}/admin/libros/${libroInicial!._id}`
      : `${API}/admin/libros`
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (res.ok) {
      onSuccess()
      setData({
        titulo: '',
        autor: '',
        descripcion: '',
        precio: null,
        stock: null,
        categoria: '',
        imagenFile: null,
      })
    } else {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} book:`, await res.json())
    }
  }

  return { data, handleChange, setDataFromLibro, submit }
}
