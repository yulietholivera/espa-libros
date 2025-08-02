// backend/src/controllers/libroController.ts
import { Request, Response } from 'express';
import Libro, { ILibro } from '../models/Libro';

// Listar todos los libros
export const listarLibros = async (req: Request, res: Response): Promise<void> => {
  console.log('➡️ ¡La petición llegó al controlador listarLibros!'); // 👈 LOG 1
  try {
    const libros: ILibro[] = await Libro.find();
    console.log(`📚 Se encontraron ${libros.length} libros en la BD.`); // 👈 LOG 2
    const total: number = await Libro.countDocuments();

    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json({ libros, total });
  } catch (error) {
    console.error('❌ Error crítico en listarLibros:', error); // 👈 LOG 3
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al obtener libros' });
  }
};

// Obtener un libro por ID
export const obtenerLibro = async (req: Request, res: Response): Promise<void> => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
      return;
    }
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json(libro);
  } catch (error) {
    console.error(error);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al obtener libro' });
  }
};

// Crear un libro (solo admin)
export const crearLibro = async (req: Request, res: Response): Promise<void> => {
  console.log('[crearLibro] req.body =', req.body);
  console.log('[crearLibro] req.file  =', req.file);

  const { titulo, autor, descripcion, precio, stock, categoria } = req.body;
  const imagenURL = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.imagenURL;

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
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error(error);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al crear libro' });
  }
};

// Actualizar un libro (solo admin)
export const actualizarLibro = async (req: Request, res: Response): Promise<void> => {
  console.log('[actualizarLibro] req.params.id =', req.params.id);
  console.log('[actualizarLibro] req.body      =', req.body);
  console.log('[actualizarLibro] req.file      =', req.file);

  const { id } = req.params;
  const updates: Partial<ILibro> = { ...req.body };

  if (req.file) {
    updates.imagenURL = `/uploads/${req.file.filename}`;
  }

  try {
    const libroActualizado = await Libro.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!libroActualizado) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
      return;
    }
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json(libroActualizado);
  } catch (error) {
    console.error(error);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al actualizar libro' });
  }
};

// Eliminar un libro (solo admin)
export const eliminarLibro = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const libroBorrado = await Libro.findByIdAndDelete(id);
    if (!libroBorrado) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
      return;
    }
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.json({ mensaje: 'Libro eliminado correctamente' });
  } catch (error) {
    console.error(error);
    // ✅ CORRECCIÓN: Se elimina 'return'
    res.status(500).json({ mensaje: 'Error al eliminar libro' });
  }
};
