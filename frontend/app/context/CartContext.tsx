// frontend/app/context/CartContext.tsx
import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { Libro } from '~/components/home/useLibros'; 
import { getToken } from '~/utils/auth';

export interface CartItem extends Libro {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (libro: Libro) => Promise<void>;
    removeFromCart: (id: string) => Promise<void>;
    clearCart: () => void;
    totalItems: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Función para formatear los datos del carrito que vienen del backend
    const formatCartItems = (backendItems: any[]): CartItem[] => {
        if (!backendItems) return [];
        return backendItems
            .map((item: any) => {
                // Asegurarse de que el libroId y su _id existen para evitar errores
                if (!item.libroId || !item.libroId._id) {
                    return null;
                }
                return {
                    ...item.libroId,
                    _id: item.libroId._id, // Aseguramos que el _id principal sea el del libro
                    quantity: item.cantidad,
                };
            })
            .filter((item): item is CartItem => item !== null); // Filtra cualquier item nulo
    };

    useEffect(() => {
        const fetchInitialCart = async () => {
            const token = getToken();
            if (!token) {
                setCartItems([]);
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch('/api/carrito', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(formatCartItems(data.items));
                }
            } catch (error) {
                console.error("Error al cargar el carrito inicial:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialCart();
    }, []);

    const addToCart = async (libro: Libro) => {
        const token = getToken();
        if (!token) {
            alert("Debes iniciar sesión para agregar al carrito.");
            return;
        }
        try {
            const response = await fetch('/api/carrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ libroId: libro._id, cantidad: 1 }),
            });
            const updatedCart = await response.json();
            if (response.ok) {
                setCartItems(formatCartItems(updatedCart.items));
            } else {
                throw new Error(updatedCart.mensaje || "Error al añadir al carrito");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (id: string) => {
        const token = getToken();
        if (!token) return;

        // Verificación para prevenir el envío de 'undefined'
        if (!id) {
            console.error("Se intentó eliminar un item sin ID.");
            return;
        }

        try {
            const response = await fetch(`/api/carrito/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const updatedCart = await response.json();
            if (response.ok) {
                setCartItems(formatCartItems(updatedCart.items));
            } else {
                throw new Error(updatedCart.mensaje || "Error al eliminar del carrito");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    const cartTotal = cartItems.reduce((sum, i) => sum + (i.precio * i.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems, cartTotal }}>
            {!isLoading && children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
}

