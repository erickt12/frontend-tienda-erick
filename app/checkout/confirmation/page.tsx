"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  qty?: number;
}

export default function SuccessPage() {
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart_backup");
    if (savedCart) {
      setOrderItems(JSON.parse(savedCart));
      localStorage.removeItem("cart_backup");
    }

    const random = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(8, "0");
    setOrderNumber(`#${random}`);
  }, []);

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <main className="min-h-screen bg-white px-4 py-20">
      <h1 className="text-3xl font-bold text-center mb-3 text-gray-900">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-center text-gray-700 mb-8">
        Tu pedido se ha procesado correctamente.
      </p>

      <div className="max-w-md mx-auto">
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Resumen del pedido
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Número de pedido: <span className="font-semibold">{orderNumber}</span>
          </p>

          <div className="divide-y divide-gray-200">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.qty || 1}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  ${(item.price * (item.qty || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Total</span>
              <span className="text-lg font-bold text-blue-700">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 block bg-blue-700 text-white text-center font-bold rounded-lg py-3 hover:bg-blue-800 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

