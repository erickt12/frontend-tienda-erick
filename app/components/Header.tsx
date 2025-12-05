// "use client";

// import { useContext, useState } from "react";
// import { ShoppingCart } from "lucide-react";
// import { CartContext } from "./context/CartContext"; // Ajustá la ruta si tu archivo está en otra carpeta
// import Link from "next/link";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { cart } = useContext(CartContext);

//   return (
//     <header className="flex justify-between items-center p-4 bg-white shadow fixed top-0 w-full z-50">
//       <h1 className="text-xl font-bold text-black">ElectroStore</h1>

//       <div className="flex items-center gap-4">
//         {/* 🛒 Carrito */}
//         <Link href="/cart" className="relative text-gray-900">
//           <ShoppingCart size={22} />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs w-4 h-4 flex items-center justify-center rounded-full">
//               {cart.reduce((total, item) => total + (item.qty || 1), 0)}
//             </span>
//           )}
//         </Link>

//         {/* 📋 Menú */}
//         <button
//           className="text-lg font-bold text-gray-900"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? "X" : "≡"}
//         </button>
//       </div>

//       {menuOpen && (
//         <nav className="absolute top-14 right-4 bg-white shadow-lg rounded-md p-3">
//           <ul className="flex flex-col gap-2">
//             <li><Link href="/">Inicio</Link></li>
//             <li><Link href="/about">Nosotros</Link></li>
//             <li><Link href="/contact">Contacto</Link></li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

"use client";

import { useContext, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { CartContext } from "./context/CartContext";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const totalQty = cart.reduce((total, item) => total + (item.qty || 1), 0);

  return (
    // Quitamos 'border-b' para que se fusione mejor con la imagen gigante si quieres
    // Usamos 'px-6' o 'px-8' para pegarlo a los bordes pero no tanto
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      
      {/* Usamos w-full en lugar de container para usar todo el ancho */}
      <div className="w-full px-6 md:px-10 h-20 flex justify-between items-center">
        
        {/* IZQUIERDA: LOGO */}
        <Link href="/" className="text-2xl font-extrabold text-blue-900 tracking-tighter">
          ElectroStore
        </Link>

        {/* DERECHA: LINKS + CARRITO (Todo junto en un bloque) */}
        <div className="flex items-center gap-8">
          
          {/* Links de Escritorio (Pegados al carrito) */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-bold text-gray-700 hover:text-blue-700 transition">
              INICIO
            </Link>
            <Link href="/about" className="text-sm font-bold text-gray-700 hover:text-blue-700 transition">
              NOSOTROS
            </Link>
            <Link href="/contact" className="text-sm font-bold text-gray-700 hover:text-blue-700 transition">
              CONTACTO
            </Link>
          </nav>

          {/* Separador vertical pequeño (opcional, estética) */}
          <div className="hidden lg:block h-6 w-px bg-gray-300"></div>

          {/* Iconos (Carrito + Hamburguesa) */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative text-gray-800 hover:text-blue-700 transition group">
              <ShoppingCart size={26} />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition">
                  {totalQty}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden text-gray-800 focus:outline-none ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {menuOpen && (
        <nav className="lg:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-800">Inicio</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-800">Nosotros</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-800">Contacto</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;

