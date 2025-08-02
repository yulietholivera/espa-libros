// frontend/app/context/CartContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback, // 👈 Importado
  useMemo,      // 👈 Importado
  type ReactNode,
} from 'react';
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
  isLoading: boolean; // 👈 Expuesto para que otros componentes sepan si el carrito está cargando
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// La función de formato no cambia, está bien como está
const formatCartItems = (backendItems: any[]): CartItem[] => {
  if (!backendItems) return [];
  return backendItems
    .map((item: any) => {
      if (!item.libroId || !item.libroId._id) {
        console.warn("Item de carrito inválido recibido del backend:", item);
        return null;
      }
      return {
        ...item.libroId,
        _id: item.libroId._id,
        quantity: item.cantidad,
      };
    })
    .filter((item): item is CartItem => item !== null);
};


export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar el carrito inicial (sin cambios, esta lógica es correcta)
  useEffect(() => {
    const fetchInitialCart = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch('/api/carrito', {
          headers: { Authorization: `Bearer ${token}` },
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

  // ✅ CORRECCIÓN: Envolvemos las funciones en useCallback para estabilizarlas
  const addToCart = useCallback(async (libro: Libro) => {
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
      console.error("Error en addToCart:", error);
    }
  }, []); // El array de dependencias está vacío porque la función no depende de ningún estado o prop del provider

  const removeFromCart = useCallback(async (id: string) => {
    const token = getToken();
    if (!token || !id) return;

    try {
      const response = await fetch(`/api/carrito/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedCart = await response.json();
      if (response.ok) {
        setCartItems(formatCartItems(updatedCart.items));
      } else {
        throw new Error(updatedCart.mensaje || "Error al eliminar del carrito");
      }
    } catch (error) {
      console.error("Error en removeFromCart:", error);
    }
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ✅ CORRECCIÓN: Envolvemos el objeto 'value' del provider en useMemo.
  // Esto asegura que los componentes consumidores solo se re-rendericen cuando
  // los datos del carrito realmente cambien.
  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems: cartItems.reduce((sum, i) => sum + i.quantity, 0),
    cartTotal: cartItems.reduce((sum, i) => sum + (i.precio * i.quantity), 0),
    isLoading,
  }), [cartItems, isLoading, addToCart, removeFromCart, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// El hook para consumir el contexto no cambia
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
