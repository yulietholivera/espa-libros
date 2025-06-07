import { Request, Response } from 'express';
import { Libro, ILibro } from '../models/Libro';

// Listar todos los libros (paginado opcionalmente)
export const listarLibros = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const libros = await Libro.find().skip(skip).limit(limit);
    const total = await Libro.countDocuments();

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
  const { titulo, autor, descripcion, precio, stock, imagenURL, categoria } = req.body;

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
  const { id } = req.params;
  const updates = req.body;

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