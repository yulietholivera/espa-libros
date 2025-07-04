// /webapps/espa-libros/backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Usuario, IUsuario } from '../models/Usuario';
import { generarToken } from '../utils/generarToken';

export const registro = async (req: Request, res: Response) => {
  const {
    nombre,
    email,
    password,
    confirmPassword,
    rol,
  } = req.body as {
    nombre: string;
    email: string;
    password: string;
    confirmPassword: string;
    rol?: 'cliente' | 'administrador';
  };

  // 0) Verificar que password y confirmPassword coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ mensaje: 'Las contraseñas no coinciden' });
  }

  try {
    // 1) Verificar si existe usuario con ese email
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // 2) Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3) Validar rol (por defecto 'cliente')
    let rolFinal: 'cliente' | 'administrador' = 'cliente';
    if (rol) {
      if (rol !== 'cliente' && rol !== 'administrador') {
        return res.status(400).json({ mensaje: 'Rol no válido' });
      }
      rolFinal = rol;
    }

    // 4) Crear y guardar el usuario
    const nuevoUsuario: IUsuario = new Usuario({
      nombre,
      email,
      passwordHash,
      rol: rolFinal,
    });
    await nuevoUsuario.save();

    // 5) Generar JWT
    const token = generarToken({ id: nuevoUsuario._id.toString(), rol: rolFinal });

    // 6) Responder con token y datos públicos del usuario
    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      token,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const esMatch = await bcrypt.compare(password, usuario.passwordHash);
    if (!esMatch) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token (incluye el rol en el payload)
    const token = generarToken({ id: usuario._id.toString(), rol: usuario.rol });

    return res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

