"use client";

import { useState } from "react";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("shippingInfo", JSON.stringify(form));
    // Usamos window.location para evitar errores de dependencia en la vista previa
    window.location.href = "/checkout/payment";
  };

  return (
    // CAMBIO CLAVE: pt-32 para que el navbar no lo tape
    <main className="min-h-screen bg-gray-50 px-4 pt-32 pb-20">
      
      {/* Contenedor tipo Tarjeta para que se vea más pro */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-500 text-center mb-8">Ingresa tus datos de envío</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Nombre */}
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Nombre Completo</label>
                <input 
                    name="name" 
                    placeholder="Ej: Juan Pérez" 
                    className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            
            {/* Dirección */}
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Dirección</label>
                <input 
                    name="address" 
                    placeholder="Ej: Av. Siempre Viva 123" 
                    className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                    value={form.address} 
                    onChange={handleChange} 
                    required 
                />
            </div>

            {/* Ciudad y Provincia */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Ciudad</label>
                    <input 
                        name="city" 
                        placeholder="Ciudad" 
                        className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                        value={form.city} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Provincia</label>
                    <input 
                        name="state" 
                        placeholder="Provincia" 
                        className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                        value={form.state} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
            </div>

            {/* CP y Teléfono */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">C. Postal</label>
                    <input 
                        name="zip" 
                        placeholder="CP" 
                        className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                        value={form.zip} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Teléfono</label>
                    <input 
                        name="phone" 
                        type="tel"
                        placeholder="Móvil" 
                        className="w-full text-gray-900 rounded-lg bg-gray-50 border border-gray-200 h-12 px-4 focus:ring-2 focus:ring-blue-600 outline-none transition" 
                        value={form.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
            </div>

            <button type="submit" className="mt-6 bg-blue-700 text-white font-bold rounded-lg h-14 hover:bg-blue-800 transition shadow-lg active:scale-95 flex items-center justify-center gap-2 text-lg">
              Continuar al Pago →
            </button>
          </form>
      </div>
    </main>
  );
}