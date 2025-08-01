// backend/src/controllers/libroController.ts
import { Request, Response } from 'express';
import Libro, { ILibro } from '../models/Libro'; // <-- CORRECCIÓN: Importación por defecto

// Listar todos los libros (paginado opcionalmente)
export const listarLibros = async (req: Request, res: Response) => {
  try {
    // Busca todos los libros sin skip ni limit
    const libros: ILibro[] = await Libro.find();
    const total: number = libros.length;

    // Devuelve array completo y total
    return res.json({ libros, total });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener libros' });
  }
};

// Obtener un libro por ID
export const obtenerLibro = async (req: Request, res: Response) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    return res.json(libro);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener libro' });
  }
};

// Crear un libro (solo admin)
export const crearLibro = async (req: Request, res: Response) => {
  console.log('[crearLibro] req.body =', req.body);
  console.log('[crearLibro] req.file  =', req.file);

  const { titulo, autor, descripcion, precio, stock, categoria } = req.body;
  const imagenURL = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.imagenURL; // fallback si envías solo URL

  try {
    const nuevoLibro: ILibro = new Libro({
      titulo,
      autor,
      descripcion,
      precio,
      stock,
      imagenURL,
      categoria,
    });
    await nuevoLibro.save();
    return res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al crear libro' });
  }
};

// Actualizar un libro (solo admin)
export const actualizarLibro = async (req: Request, res: Response) => {
  console.log('[actualizarLibro] req.params.id =', req.params.id);
  console.log('[actualizarLibro] req.body      =', req.body);
  console.log('[actualizarLibro] req.file      =', req.file);

  const { id } = req.params;

  // Empaquetamos los campos de texto
  const updates: Partial<ILibro> = { ...req.body };

  // Si vino archivo, actualizamos la URL
  if (req.file) {
    updates.imagenURL = `/uploads/${req.file.filename}`;
  }

  try {
    const libroActualizado = await Libro.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!libroActualizado) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    return res.json(libroActualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar libro' });
  }
};

// Eliminar un libro (solo admin)
export const eliminarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const libroBorrado = await Libro.findByIdAndDelete(id);
    if (!libroBorrado) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    return res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al eliminar libro' });
  }
};
