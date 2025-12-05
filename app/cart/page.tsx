"use client";

import { useContext } from "react";
import { CartContext } from "../components/context/CartContext";
import { useRouter } from "next/navigation";


const CartPage = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  return (
    <main className="bg-white container mx-auto px-4 py-20">
      {/* <h1 className="text-2xl text-gray-900 font-bold mb-6 border-b border-gray-300 pb-15">
        Mi Carrito 
        ({cart.length} productos)
      </h1> */}

    
<div className="mt-6">
  <a
    href="/"
    className="inline-flex items-center gap-2 font-medium text-blue-700 hover:underline"
  >
    ← Seguir comprando
  </a>
</div>
      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
        
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          {/* 🧺 Columna Izquierda: Lista de productos */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-gray-300">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg h-28 w-28 object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-medium text-gray-900">{item.name}</p>
                        <p className="text-gray-500 text-sm mt-1">Cantidad: {item.qty}</p>
                      </div>
                      <p className="text-lg font-medium text-gray-900">
                        ${(item.price * (item.qty || 1)).toFixed(2)}
                      </p>
                    </div>



                    {/* 🧮 Botones de cantidad */}
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 text-sm"
                      >
                        🗑️ Eliminar
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="text-gray-600 h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-lg font-bold"
                        >
                          −
                        </button>
                        <span className="text-gray-600 w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="text-gray-600 h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

{/* <div className="mt-6">
  <a
    href="/"
    className="inline-flex items-center gap-2 font-medium text-blue-700 hover:underline"
  >
    ← Seguir comprando
  </a>
</div> */}


          {/* 💰 Columna Derecha: Resumen */}
          <div className="lg:col-span-1">
            <div className="border border-gray-400 rounded-xl p-6">
              <h2 className="text-gray-800 text-xl font-bold mb-4">Resumen del pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    $
                    {cart
                      .reduce((total, item) => total + item.price * (item.qty || 1), 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Envío</span>
                  <span className="font-medium text-gray-500">Gratis</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-500">Total</span>
                  <span className="text-2xl font-bold text-blue-700">
                    $
                    {cart
                      .reduce((total, item) => total + item.price * (item.qty || 1), 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
              onClick={() => router.push("/checkout")}
              className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors">
                Proceder al pago
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;


