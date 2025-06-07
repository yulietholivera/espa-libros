import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Usuario, IUsuario } from '../models/Usuario';
import { generarToken } from '../utils/generarToken';

export const registro = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  try {
    // 1) Verificar si existe usuario con ese email
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // 2) Encriptar password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3) Crear usuario
    const nuevoUsuario: IUsuario = new Usuario({
      nombre,
      email,
      passwordHash,
      rol: 'cliente',
    });
    await nuevoUsuario.save();

    return res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const esMatch = await bcrypt.compare(password, usuario.passwordHash);
    if (!esMatch) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token
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