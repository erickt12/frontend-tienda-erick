
"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Opcional: si quieres iconos reales

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-12 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1 - Brand */}
          <div>
            <h3 className="text-xl font-bold text-blue-900">ElectroStore</h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Tu destino número uno para encontrar lo último en tecnología, gadgets y accesorios con garantía oficial.
            </p>
          </div>

          {/* Columna 2 - Company */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Compañía</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Tienda
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Servicio al cliente */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Servicio al cliente</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Mi Carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Newsletter</h4>
            <p className="mb-4 text-sm text-gray-500">
              Suscríbete para recibir ofertas exclusivas.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-grow rounded-l-lg border border-gray-300 text-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded-r-lg text-sm font-bold hover:bg-blue-800 transition shadow-sm"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 ElectroStore. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-700 transition">Instagram</a>
            <a href="#" className="hover:text-blue-700 transition">Facebook</a>
            <a href="#" className="hover:text-blue-700 transition">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;