"use client";

import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { X, CheckCircle } from "lucide-react";
import  Link  from "next/link";

const CartModal = () => {
  const { isModalOpen, closeModal, lastAdded } = useContext(CartContext);

  if (!isModalOpen || !lastAdded) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 pt-10 flex flex-col items-center">
        {/* Botón de cerrar */}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-black transition"
        >
          <X size={24} />
        </button>

        {/* Icono de éxito */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
          <CheckCircle size={36} />
        </div>

        {/* Título */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Producto añadido al carrito
        </h2>

        {/* Producto añadido */}
        <div className="w-full border-y border-gray-200 py-4 mb-4 flex items-center gap-4">
          <img
            src={lastAdded.image}
            alt={lastAdded.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{lastAdded.name}</p>
            <p className="text-sm text-gray-500">Qty: 1</p>
          </div>
          <p className="font-semibold text-gray-800">${lastAdded.price}</p>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3 w-full">
<Link
  href="/cart"
  className="flex items-center justify-center h-12 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition-colors"
>
  Ver carrito
</Link>

          <button
            onClick={closeModal}
            className="h-12 rounded-lg border border-gray-300 text-primary font-bold hover:bg-primary/10"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;



