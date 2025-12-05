import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1>
            <p className="text-lg text-gray-600">Estamos aquí para ayudarte. Envíanos un mensaje.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
            <div className="bg-blue-900 p-8 md:p-12 text-white flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
                    <p className="text-blue-100 mb-8 leading-relaxed">
                        ¿Tienes dudas sobre un producto o tu pedido? 
                        Nuestro equipo responde usualmente en menos de 2 horas.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Phone size={20} />
                            </div>
                            <span>+54 911 1234 5678</span>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Mail size={20} />
                            </div>
                            <span>contacto@electrostore.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <MapPin size={20} />
                            </div>
                            <span>Av. Tecnología 123, Buenos Aires</span>
                        </div>
                    </div>
                </div>

                {/* Decoración circulos (opcional) */}
                <div className="mt-12 opacity-20">
                    <div className="w-24 h-24 rounded-full border-2 border-white ml-auto"></div>
                </div>
            </div>

            {/* COLUMNA DERECHA: FORMULARIO */}
            <div className="p-8 md:p-12">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nombre</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Tu nombre" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Apellido</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="Tu apellido" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="ejemplo@correo.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mensaje</label>
                        <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="¿En qué podemos ayudarte?"></textarea>
                    </div>

                    <button className="w-full bg-blue-700 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition shadow-lg active:scale-95">
                        Enviar Mensaje
                    </button>
                </form>
            </div>

        </div>
      </div>
    </main>
  );
}