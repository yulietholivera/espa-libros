// /webapps/espa-libros/frontend/app/routes/RegisterPage.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { saveToken } from "../utils/auth";
import Logo from './../assets/logo.svg';

export function meta() {
    return [{ title: "Registro de Usuario" }];
}

export default function RegisterPage() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre,
                    email,
                    password,
                    confirmPassword,
                    esAdmin: isAdmin 
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.errores?.join(", ") || data.mensaje || "Error desconocido");
            } else {
                saveToken(data.token);
                navigate("/");
            }
        } catch (err) {
            setError("No se pudo conectar al servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-regal2-espalibros pb-96">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Link to="/">
                            <img src={Logo} alt="Espa-Libros Logo" className="mx-auto h-10 w-auto" />
                        </Link>
                    </div>
                    <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Registar Usuario</h1>

                    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campos de Nombre, Email, Contraseña, etc. */}
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-900">
                                    Nombre
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        required
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-regal-espalibros sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-regal-espalibros sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-regal-espalibros sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                                    Confirmar Contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        minLength={6}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-regal-espalibros sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* --- SECCIÓN DE ADMINISTRADOR (SIEMPRE VISIBLE) --- */}
                            {/* Se muestra este bloque sin ninguna condición para que siempre aparezca */}
                            <div className="flex items-center justify-between">
                                <span className="flex flex-grow flex-col">
                                    <span className="text-sm font-medium leading-6 text-gray-900">
                                        Administrador
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Activa esta opción para dar privilegios de administrador.
                                    </span>
                                </span>
                                <label htmlFor="is-admin-toggle" className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        id="is-admin-toggle"
                                        className="peer sr-only"
                                        checked={isAdmin}
                                        onChange={() => setIsAdmin(!isAdmin)}
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 border border-gray-400 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-regal-espalibros peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                                </label>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-red-600 text-sm">
                                    {error}
                                </p>
                            )}

                            {/* Botón de envío */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-regal-espalibros px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-regal-espalibros disabled:opacity-50"
                                >
                                    {loading ? 'Registrando...' : 'Registrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
