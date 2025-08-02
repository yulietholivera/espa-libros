// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Usuario, IUsuario } from '../models/Usuario';
import { generarToken } from '../utils/generarToken';

export const registro = async (req: Request, res: Response): Promise<void> => {
    const {
        nombre,
        email,
        password,
        confirmPassword,
        rol,
        // --- AÑADIDO: Recibir el nuevo campo ---
        esAdmin,
    } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({ mensaje: 'Las contraseñas no coinciden' });
        return;
    }

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            res.status(400).json({ mensaje: 'El email ya está registrado' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // --- LÓGICA MODIFICADA: Determinar el rol del usuario ---
        let rolFinal: 'cliente' | 'administrador' = 'cliente';
        if (esAdmin === true) {
            rolFinal = 'administrador';
        } else if (rol === 'administrador') {
            rolFinal = 'administrador';
        }
        // --- FIN DE LA LÓGICA MODIFICADA ---

        const nuevoUsuario: IUsuario = new Usuario({
            nombre,
            email,
            passwordHash,
            rol: rolFinal,
        });
        await nuevoUsuario.save();

        const token = generarToken({ id: (nuevoUsuario as any)._id.toString(), rol: rolFinal });

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            token,
            usuario: {
                id: (nuevoUsuario as any)._id.toString(),
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            res.status(400).json({ mensaje: 'Credenciales inválidas' });
            return;
        }

        const esMatch = await bcrypt.compare(password, usuario.passwordHash);
        if (!esMatch) {
            res.status(400).json({ mensaje: 'Credenciales inválidas' });
            return;
        }

        const token = generarToken({ id: (usuario as any)._id.toString(), rol: usuario.rol });

        res.json({
            token,
            usuario: {
                id: (usuario as any)._id.toString(),
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};
