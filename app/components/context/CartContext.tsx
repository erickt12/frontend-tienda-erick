"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  qty?: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void; // 👈 agregado
  isModalOpen: boolean;
  lastAdded: Product | null;
  closeModal: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  removeFromCart: () => {},
  clearCart: () => {}, // 👈 agregado
  isModalOpen: false,
  lastAdded: null,
  closeModal: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);

  // ✅ Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Añadir producto
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });

    setLastAdded(product);
    setIsModalOpen(true);
  };

  // ⬆️ Aumentar cantidad
  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  // ⬇️ Disminuir cantidad
  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max((item.qty || 1) - 1, 1) }
            : item
        )
        .filter((item) => item.qty && item.qty > 0)
    );
  };

  // 🗑️ Eliminar producto
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 Vaciar carrito completamente
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const closeModal = () => setIsModalOpen(false);

  // ⏱️ Cerrar modal automáticamente
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => setIsModalOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart, // 👈 agregado
        isModalOpen,
        lastAdded,
        closeModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


