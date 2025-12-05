

"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/components/context/CartContext";

export default function Payment() {
  const router = useRouter();
  const { clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    sameAddress: true,
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guardamos el carrito actual antes de vaciarlo (para mostrarlo en la confirmación)
    const currentCart = localStorage.getItem("cart");
    if (currentCart) {
      localStorage.setItem("cart_backup", currentCart);
    }

    // Simulamos el pago
    setTimeout(() => {
      clearCart();
      router.push("/checkout/confirmation");
    }, 1000);
  };

  return (
    // CAMBIO CLAVE: pt-32 para bajar el contenido y que no lo tape el Navbar
    // Fondo gris suave (bg-gray-50) para resaltar la tarjeta blanca
    <main className="min-h-screen bg-gray-50 px-4 pt-32 pb-20">
      
      {/* Contenedor tipo Tarjeta */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-900">Pago Seguro</h1>
          <p className="text-gray-500 text-center mb-8">Ingresa los datos de tu tarjeta</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Número de Tarjeta */}
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Número de tarjeta</label>
                <input 
                    name="cardNumber" 
                    placeholder="0000 0000 0000 0000" 
                    className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition font-mono" 
                    value={form.cardNumber} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            {/* Vencimiento y CVV */}
            <div className="flex gap-4">
              <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Vencimiento</label>
                  <input 
                    name="expiry" 
                    placeholder="MM/AA" 
                    className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition text-center" 
                    value={form.expiry} 
                    onChange={handleChange} 
                    required 
                  />
              </div>
              <div className="w-24">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">CVV</label>
                  <input 
                    name="cvv" 
                    placeholder="123" 
                    className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition text-center" 
                    value={form.cvv} 
                    onChange={handleChange} 
                    required 
                  />
              </div>
            </div>

            {/* Checkbox Dirección */}
            <label className="flex items-center gap-3 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition">
              <input 
                type="checkbox" 
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                checked={form.sameAddress} 
                onChange={(e) => setForm({ ...form, sameAddress: e.target.checked })} 
              />
              <span className="text-gray-700 text-sm font-medium">Usar la misma dirección de envío</span>
            </label>

            {/* Dirección de Facturación (si es diferente) */}
            {!form.sameAddress && (
              <div className="flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm font-bold text-gray-900 border-b pb-2">Dirección de facturación</p>
                <input name="address" placeholder="Dirección" className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none" value={form.address} onChange={handleChange} />
                <div className="flex gap-4">
                  <input name="city" placeholder="Ciudad" className="flex-1 text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none" value={form.city} onChange={handleChange} />
                  <input name="state" placeholder="Provincia" className="flex-1 text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none" value={form.state} onChange={handleChange} />
                </div>
                <input name="zip" placeholder="CP" className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none" value={form.zip} onChange={handleChange} />
              </div>
            )}

            <button
              type="submit"
              className="mt-6 bg-blue-700 text-white font-bold rounded-lg h-14 hover:bg-blue-800 transition shadow-lg active:scale-95 flex items-center justify-center gap-2 text-lg"
            >
              Pagar y Finalizar
            </button>
          </form>
      </div>
    </main>
  );
}