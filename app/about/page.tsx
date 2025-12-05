import Link from "next/link";
import { CheckCircle, Users, Truck, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-12">
      {/* HEADER SIMPLE */}
      <div className="bg-blue-900 text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Nuestra Historia</h1>
          <p className="text-lg text-blue-100">
            Conectando a las personas con la tecnología del futuro desde 2024.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-screen-xl space-y-20">
        
        {/* SECCIÓN 1: IMAGEN Y TEXTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video md:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
              alt="Equipo de trabajo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Sobre ElectroStore</span>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Más que una tienda, somos fanáticos de la tecnología.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ElectroStore nació con una misión simple: democratizar el acceso a la última tecnología. 
              Creemos que los gadgets no son solo herramientas, son extensiones de nuestra creatividad.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Seleccionamos cada producto meticulosamente, asegurando que solo lo mejor del mercado llegue a tus manos. 
              Sin intermediarios innecesarios, sin precios inflados.
            </p>
          </div>
        </div>

        {/* SECCIÓN 2: VALORES (ICONOS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardValue 
                icon={<ShieldCheck size={40} />} 
                title="Garantía Oficial" 
                desc="Todos nuestros productos cuentan con garantía directa de fábrica." 
            />
            <CardValue 
                icon={<Truck size={40} />} 
                title="Envíos Rápidos" 
                desc="Recibe tu compra en menos de 48 horas en cualquier parte del país." 
            />
            <CardValue 
                icon={<Users size={40} />} 
                title="Soporte 24/7" 
                desc="Un equipo de expertos listo para ayudarte antes y después de tu compra." 
            />
        </div>

        {/* CTA FINAL */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para actualizar tu setup?</h3>
            <Link 
                href="/" 
                className="inline-flex h-12 px-8 items-center justify-center rounded-full bg-blue-700 text-white font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-xl"
            >
                Ver Catálogo
            </Link>
        </div>

      </div>
    </main>
  );
}

// Componente pequeño para los valores
const CardValue = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition border border-transparent hover:border-gray-100">
        <div className="text-blue-600 mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
    </div>
);