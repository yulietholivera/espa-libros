import { Request, Response } from 'express';
import { Carrito, ICarrito } from '../models/Carrito';
import { Libro } from '../models/Libro';

export const obtenerCarrito = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;

  try {
    let carrito = await Carrito.findOne({ usuarioId }).populate('items.libroId');
    if (!carrito) {
      // Si no existe, crear uno vacío
      carrito = new Carrito({ usuarioId, items: [], total: 0 });
      await carrito.save();
    }
    return res.json(carrito);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al obtener carrito' });
  }
};

export const agregarAlCarrito = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;
  const { libroId, cantidad } = req.body as { libroId: string; cantidad: number };

  try {
    // 1) Obtener o crear carrito
    let carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      carrito = new Carrito({ usuarioId, items: [], total: 0 });
    }

    // 2) Obtener precio del libro
    const libro = await Libro.findById(libroId);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    // 3) Buscar si ya existe el item en el carrito
    const itemExistente = carrito.items.find((item) => item.libroId.toString() === libroId);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
      itemExistente.precioUnitario = libro.precio;
    } else {
      carrito.items.push({
        libroId: libro._id,
        cantidad,
        precioUnitario: libro.precio,
      });
    }

    // 4) Recalcular total
    carrito.total = carrito.items.reduce((acc, item) => {
      return acc + item.precioUnitario * item.cantidad;
    }, 0);

    carrito.fechaActualizacion = new Date();
    await carrito.save();

    return res.json(carrito);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al agregar al carrito' });
  }
};

export const actualizarItemCarrito = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;
  const libroId = req.body.libroId as string;
  const nuevaCantidad = Number(req.body.cantidad);

  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    const itemIndex = carrito.items.findIndex((item) => item.libroId.toString() === libroId);
    if (itemIndex === -1) {
      return res.status(404).json({ mensaje: 'Item no existe en el carrito' });
    }

    if (nuevaCantidad <= 0) {
      carrito.items.splice(itemIndex, 1);
    } else {
      // Actualizar cantidad
      carrito.items[itemIndex].cantidad = nuevaCantidad;
    }

    // Recalcular total
    carrito.total = carrito.items.reduce((acc, item) => {
      return acc + item.precioUnitario * item.cantidad;
    }, 0);

    carrito.fechaActualizacion = new Date();
    await carrito.save();

    return res.json(carrito);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al actualizar item' });
  }
};

export const eliminarItemCarrito = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;
  const libroId = req.params.libroId as string;

  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    carrito.items = carrito.items.filter((item) => item.libroId.toString() !== libroId);
    carrito.total = carrito.items.reduce((acc, item) => {
      return acc + item.precioUnitario * item.cantidad;
    }, 0);

    carrito.fechaActualizacion = new Date();
    await carrito.save();

    return res.json(carrito);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al eliminar item' });
  }
};

export const vaciarCarrito = async (req: Request, res: Response) => {
  const usuarioId = req.user!.id;

  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
    carrito.items = [];
    carrito.total = 0;
    carrito.fechaActualizacion = new Date();
    await carrito.save();

    return res.json({ mensaje: 'Carrito vaciado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error al vaciar carrito' });
  }
};