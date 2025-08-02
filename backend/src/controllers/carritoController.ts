// backend/src/controllers/carritoController.ts
import { Request, Response } from 'express';
import { Carrito } from '../models/Carrito';
import Libro from '../models/Libro';
import { Types } from 'mongoose';

export const obtenerCarrito = async (req: Request, res: Response): Promise<void> => {
  const usuarioId = req.user!.id;

  try {
    console.log(`💡 [obtenerCarrito] UsuarioId: ${usuarioId}`);

    let carrito = await Carrito.findOne({ usuarioId }).populate('items.libroId');
    if (!carrito) {
      console.log('⚠️  [obtenerCarrito] No se encontró carrito existente. Creando uno nuevo.');
      carrito = new Carrito({ usuarioId, items: [], total: 0 });
      await carrito.save();
    }

    res.json(carrito);
  } catch (error) {
    console.error('❌ [obtenerCarrito] Error al obtener carrito:', error);
    res.status(500).json({ mensaje: 'Error al obtener carrito' });
  }
};

export const agregarAlCarrito = async (req: Request, res: Response): Promise<void> => {
  console.log('💡 [agregarAlCarrito] req.body =', JSON.stringify(req.body, null, 2));

  const usuarioId = req.user!.id;
  const { libroId, cantidad } = req.body as { libroId: string; cantidad: number };

  if (!libroId || typeof libroId !== 'string' || libroId.trim() === '') {
    res.status(400).json({ mensaje: '"libroId" es obligatorio y debe ser un string válido.' });
    return;
  }
  if (typeof cantidad !== 'number' || cantidad < 1) {
    res.status(400).json({ mensaje: '"cantidad" es obligatoria y debe ser un número mayor o igual a 1.' });
    return;
  }

  try {
    let carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      console.log('⚠️  [agregarAlCarrito] No se encontró carrito existente. Creando uno nuevo.');
      carrito = new Carrito({ usuarioId, items: [], total: 0 });
    }

    const libro = await Libro.findById(libroId);
    if (!libro) {
      console.warn(`⚠️  [agregarAlCarrito] Libro con ID ${libroId} no encontrado.`);
      res.status(404).json({ mensaje: 'Libro no encontrado' });
      return;
    }

    const itemExistente = carrito.items.find((item) => item.libroId.toString() === libroId);
    if (itemExistente) {
      console.log(`🔄 [agregarAlCarrito] El libro ya existe en el carrito. Actualizando cantidad a ${itemExistente.cantidad + cantidad}.`);
      itemExistente.cantidad += cantidad;
      itemExistente.precioUnitario = libro.precio;
    } else {
      console.log(`➕ [agregarAlCarrito] Agregando libro nuevo al carrito: ${libroId}, cantidad: ${cantidad}.`);
      carrito.items.push({
        libroId: libro._id as Types.ObjectId,
        cantidad,
        precioUnitario: libro.precio,
      });
    }

    carrito.total = carrito.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
    carrito.fechaActualizacion = new Date();
    await carrito.save();

    const carritoPopulado = await carrito.populate('items.libroId');

    console.log('✅ [agregarAlCarrito] Carrito guardado con éxito. Total actualizado:', carritoPopulado.total);
    res.json(carritoPopulado);

  } catch (error) {
    console.error('❌ [agregarAlCarrito] Error al agregar al carrito:', error);
    res.status(500).json({ mensaje: 'Error al agregar al carrito' });
  }
};

export const actualizarItemCarrito = async (req: Request, res: Response): Promise<void> => {
  console.log('💡 [actualizarItemCarrito] req.body =', JSON.stringify(req.body, null, 2));

  const usuarioId = req.user!.id;
  const libroId = req.body.libroId as string;
  const nuevaCantidad = Number(req.body.cantidad);

  if (!libroId || typeof libroId !== 'string' || libroId.trim() === '') {
     res.status(400).json({ mensaje: '"libroId" es obligatorio y debe ser un string válido.' });
     return;
  }
  if (isNaN(nuevaCantidad) || nuevaCantidad < 0) {
     res.status(400).json({ mensaje: '"cantidad" debe ser un número mayor o igual a 0.' });
     return;
  }

  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      console.warn(`⚠️  [actualizarItemCarrito] Carrito para usuario ${usuarioId} no encontrado.`);
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
      return;
    }

    const itemIndex = carrito.items.findIndex((item) => item.libroId.toString() === libroId);
    if (itemIndex === -1) {
      console.warn(`⚠️  [actualizarItemCarrito] El ítem con libroId ${libroId} no existe en el carrito.`);
      res.status(404).json({ mensaje: 'Item no existe en el carrito' });
      return;
    }

    if (nuevaCantidad <= 0) {
      console.log(`➖ [actualizarItemCarrito] Cantidad ${nuevaCantidad} <= 0, eliminando ítem del carrito.`);
      carrito.items.splice(itemIndex, 1);
    } else {
      console.log(`🔄 [actualizarItemCarrito] Actualizando cantidad del ítem a ${nuevaCantidad}.`);
      carrito.items[itemIndex].cantidad = nuevaCantidad;
    }

    carrito.total = carrito.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
    carrito.fechaActualizacion = new Date();
    await carrito.save();

    const carritoPopulado = await carrito.populate('items.libroId');

    console.log('✅ [actualizarItemCarrito] Carrito actualizado. Nuevo total:', carritoPopulado.total);
    res.json(carritoPopulado);

  } catch (error) {
    console.error('❌ [actualizarItemCarrito] Error al actualizar ítem en el carrito:', error);
    res.status(500).json({ mensaje: 'Error al actualizar item' });
  }
};

export const eliminarItemCarrito = async (req: Request, res: Response): Promise<void> => {
  console.log('💡 [eliminarItemCarrito] req.params =', JSON.stringify(req.params, null, 2));

  const usuarioId = req.user!.id;
  const libroId = req.params.libroId as string;

  if (!libroId || typeof libroId !== 'string' || libroId.trim() === '') {
    res.status(400).json({ mensaje: '"libroId" en la URL es obligatorio y debe ser un string válido.' });
    return;
  }

  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      console.warn(`⚠️  [eliminarItemCarrito] Carrito para usuario ${usuarioId} no encontrado.`);
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
      return;
    }

    const prevCount = carrito.items.length;
    carrito.items = carrito.items.filter((item) => item.libroId.toString() !== libroId);
    if (carrito.items.length === prevCount) {
      console.warn(`⚠️  [eliminarItemCarrito] Ítem con libroId ${libroId} no existía en el carrito.`);
      res.status(404).json({ mensaje: 'Item no existe en el carrito' });
      return;
    }

    carrito.total = carrito.items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
    carrito.fechaActualizacion = new Date();
    await carrito.save();

    const carritoPopulado = await carrito.populate('items.libroId');

    console.log('✅ [eliminarItemCarrito] Ítem eliminado. Nuevo total:', carritoPopulado.total);
    res.json(carritoPopulado);

  } catch (error) {
    console.error('❌ [eliminarItemCarrito] Error al eliminar ítem del carrito:', error);
    res.status(500).json({ mensaje: 'Error al eliminar item' });
  }
};

export const vaciarCarrito = async (req: Request, res: Response): Promise<void> => {
  console.log('💡 [vaciarCarrito] UsuarioId:', req.user!.id);

  const usuarioId = req.user!.id;

  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      console.warn(`⚠️  [vaciarCarrito] Carrito para usuario ${usuarioId} no encontrado.`);
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
      return;
    }

    carrito.items = [];
    carrito.total = 0;
    carrito.fechaActualizacion = new Date();
    await carrito.save();

    console.log('✅ [vaciarCarrito] Carrito vaciado correctamente.');
    res.json({ mensaje: 'Carrito vaciado correctamente' });
  } catch (error) {
    console.error('❌ [vaciarCarrito] Error al vaciar carrito:', error);
    res.status(500).json({ mensaje: 'Error al vaciar carrito' });
  }
};
