// /webapps/espa-libros/frontend/app/components/crud/BookModal/useBookForm.ts
import { useState } from 'react'

export interface BookData {
  titulo: string
  autor: string
  descripcion: string
  precio: number | null
  stock: number | null
  categoria: string
  imagenFile: File | null
}

export function useBookForm(onSuccess: () => void) {
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

  function handleChange<K extends keyof BookData>(key: K, value: BookData[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  async function submit() {
    if (!data.imagenFile) return

    const formData = new FormData()
    formData.append('titulo', data.titulo)
    formData.append('autor', data.autor)
    formData.append('descripcion', data.descripcion)
    formData.append('precio', data.precio?.toString() ?? '0')
    formData.append('stock', data.stock?.toString() ?? '0')
    formData.append('categoria', data.categoria)
    formData.append('imagenURL', data.imagenFile)

    const token = localStorage.getItem('token')
    const res = await fetch(`${API}/libros`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    })

    if (res.ok) {
      onSuccess()
      setData({ titulo: '', autor: '', descripcion: '', precio: null, stock: null, categoria: '', imagenFile: null })
    } else {
      console.error('Error creating book:', await res.json())
    }
  }

  return { data, handleChange, submit }
}