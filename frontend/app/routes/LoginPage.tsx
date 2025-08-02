// frontend/app/routes/LoginPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
// El hook 'useNavigate' ya no es necesario para la redirección principal
import { Link, useNavigate } from "react-router";
import { saveToken, saveUser } from "../utils/auth"
import Logo from './../assets/logo.svg';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Aunque usamos window.location para la redirección principal,
    // mantenemos navigate por si se necesita para otras lógicas en el futuro.
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log(`💡 [Login] Intentando iniciar sesión con email: ${email}`);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const body = await res.json();

            console.log("✅ [Login] Respuesta completa del backend:", body);

            if (!res.ok) {
                throw new Error(body.mensaje || "Error al iniciar sesión");
            }
            
            // Guarda el token y los datos de usuario
            saveToken(body.token)
            saveUser(body.usuario)

            console.log("✅ [Login] Token guardado en localStorage:", localStorage.getItem('token'));

            // ✅ CORRECCIÓN APLICADA AQUÍ
            // Redirige al home forzando una recarga completa para limpiar el estado.
            window.location.href = "/";

        } catch (err: any) {
            console.error("❌ [Login] Error en el handleSubmit:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-regal2-espalibros pb-96 pt-24">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Link to="/">
                            <img src={Logo} alt="Espa-Libros Logo" />
                        </Link>
                    </div>
                    
                    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                            Iniciar sesión
                        </h1>

                        {error && (
                            <p className="text-sm text-red-600 mb-4">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Usuario:
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-regal-espalibros"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Contraseña:
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-regal-espalibros"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-regal-espalibros px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-regal-espalibros-dark focus:outline-2 focus:outline-offset-2 focus:outline-regal-espalibros disabled:opacity-50"
                                >
                                    {loading ? "Cargando..." : "Iniciar sesión"}
                                </button>
                            </div>
                        </form>
                        
                        <p className="mt-6 text-center text-sm text-gray-500">
                            ¿No eres miembro?{' '}
                            <Link to="/registrar" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
