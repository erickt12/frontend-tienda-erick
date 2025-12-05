// "use client";

// import { useEffect, useRef, useState, useContext } from "react";
// import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
// import { CartContext } from "./context/CartContext";
// import Link from "next/link";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
// }

// const TopSellers = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     const fetchTopProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:3001/products");
//         const data: Product[] = await res.json();
//         const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 10);
//         setProducts(shuffled);
//       } catch (err) {
//         console.error("Error loading top sellers", err);
//       }
//     };

//     fetchTopProducts();
//   }, []);

//   const handleScroll = (direction: "left" | "right") => {
//     if (!containerRef.current) return;
//     const container = containerRef.current;
//     const isDesktop = window.innerWidth >= 1024;
//     const productWidth = 160;
//     const scrollAmount = isDesktop ? productWidth * 5 : productWidth * 1;
//     const scrollBy = direction === "left" ? -scrollAmount : scrollAmount;
//     container.scrollBy({ left: scrollBy, behavior: "smooth" });
//   };

//   return (
//     <section className="px-4 pt-6">
//       <div className="flex justify-between items-center mb-3">
//         <h2 className="text-lg font-bold text-black">Más Vendidos</h2>
//       </div>

//       <div className="relative px-4">
//         {/* Flecha izquierda */}
//         <button
//           onClick={() => handleScroll("left")}
//           className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-200 active:scale-95 z-10 backdrop-blur-sm"
//         >
//           <ChevronLeft size={20} />
//         </button>

//         {/* Carrusel */}
//         <div
//           ref={containerRef}
//           className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
//         >
//           {products.map((p) => (
//             <div
//               key={p.id}
//               className="relative flex w-40 flex-none flex-col gap-2"
//             >
//               <Link href={`/product/${p.id}`}>
//                 <div className="relative">
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="aspect-square w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105"
//                   />

//                   {/* Botón de carrito dentro de la imagen */}
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToCart(p);
//                     }}
//                     className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-primary text-white hover:bg-blue-800 transition"
//                   >
//                     <ShoppingCart size={16} />
//                   </button>
//                 </div>
//               </Link>

//               <Link href={`/product/${p.id}`}>
//                 <p className="truncate font-semibold text-sm text-black hover:text-primary transition">
//                   {p.name}
//                 </p>
//               </Link>
//               <p className="font-bold text-base text-black">${p.price}</p>
//             </div>
//           ))}
//         </div>

//         {/* Flecha derecha */}
//         <button
//           onClick={() => handleScroll("right")}
//           className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 text-black p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-all duration-200 active:scale-95 z-10 backdrop-blur-sm"
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default TopSellers;

"use client";

import { useEffect, useState, useContext } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { CartContext } from "./context/CartContext";
import Link from "next/link";

const STRAPI_URL = "https://backend-tienda-erick.onrender.com";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const TopSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // Estado exclusivo para PC: ¿En qué índice empieza el carrusel?
  const [currentIndex, setCurrentIndex] = useState(0); 
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/productos?populate=*`);
        const json = await res.json();
        const { data } = json;

        const formattedProducts = data.map((item: any) => {
          const imgField = item.Imagen || item.imagen;
          const imgUrlRelative = imgField?.url || imgField?.[0]?.url;
          const finalImage = imgUrlRelative ? `${STRAPI_URL}${imgUrlRelative}` : "/placeholder.png";

          return {
            id: item.id,
            name: item.Nombre,
            price: item.Precio,
            image: finalImage,
            category: "General"
          };
        });

        // ⚠️ IMPORTANTE: Cortamos a exactamente 10 productos como pediste
        // Barajamos primero para que sea aleatorio y tomamos 10
        const shuffled = [...formattedProducts].sort(() => Math.random() - 0.5).slice(0, 10);
        setProducts(shuffled);

      } catch (err) {
        console.error("Error loading top sellers", err);
      }
    };

    fetchTopProducts();
  }, []);

  // --- LÓGICA DE PC (Saltar de 5 en 5) ---
  const handleNextDesktop = () => {
    // Si estamos al final, volvemos a 0 (Bucle), si no, sumamos 5
    setCurrentIndex((prev) => (prev + 5 >= products.length ? 0 : prev + 5));
  };

  const handlePrevDesktop = () => {
    // Si estamos en 0, vamos al final, si no, restamos 5
    setCurrentIndex((prev) => (prev - 5 < 0 ? Math.max(0, products.length - 5) : prev - 5));
  };

  // Recortamos los 5 productos que se deben ver AHORA en PC
  const desktopVisibleProducts = products.slice(currentIndex, currentIndex + 5);


  return (
    <section className="container mx-auto px-4 py-12 max-w-screen-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Más Vendidos</h2>
        
        {/* Indicador de página solo para PC */}
        <div className="hidden lg:block text-sm font-medium text-gray-500">
             Viendo {currentIndex + 1}-{Math.min(currentIndex + 5, products.length)} de {products.length}
        </div>
      </div>

      {/* =======================================================
          VISTA MÓVIL (Scroll Libre - Lo que ya te gustaba)
          Se oculta en pantallas grandes (lg:hidden)
      ======================================================= */}
      <div className="lg:hidden relative">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} addToCart={addToCart} mobile={true} />
          ))}
        </div>
      </div>

      {/* =======================================================
          VISTA PC (Carrusel de 5 en 5 en Bucle)
          Solo visible en pantallas grandes (hidden lg:flex)
      ======================================================= */}
      <div className="hidden lg:flex relative items-center group">
        
        {/* Flecha Izquierda PC */}
        <button
          onClick={handlePrevDesktop}
          className="absolute -left-5 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>

        {/* GRILLA DE 5 PRODUCTOS */}
        <div className="grid grid-cols-5 gap-6 w-full animate-in fade-in duration-500">
          {desktopVisibleProducts.map((p) => (
            <ProductCard key={p.id} p={p} addToCart={addToCart} mobile={false} />
          ))}
          
          {/* Relleno si hay menos de 5 productos (opcional, para que no se rompa el layout) */}
          {desktopVisibleProducts.length < 5 && 
             Array(5 - desktopVisibleProducts.length).fill(null).map((_, i) => (
               <div key={`empty-${i}`} className="w-full"></div>
             ))
          }
        </div>

        {/* Flecha Derecha PC */}
        <button
          onClick={handleNextDesktop}
          className="absolute -right-5 z-10 bg-white text-gray-800 p-3 rounded-full shadow-lg border border-gray-100 hover:bg-blue-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </section>
  );
};

// --- COMPONENTE TARJETA (Para no repetir código) ---
// const ProductCard = ({ p, addToCart, mobile }: { p: Product, addToCart: any, mobile: boolean }) => {
//     return (
//         <div className={`relative flex flex-col bg-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group/card ${mobile ? 'min-w-[160px] w-40 snap-start' : 'w-full'}`}>
//             <Link href={`/product/${p.id}`}>
//                 <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-xl bg-gray-100">
//                     <img
//                         src={p.image}
//                         alt={p.name}
//                         className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
//                     />
//                     {/* Botón flotante */}
//                     <button
//                         onClick={(e) => {
//                             e.preventDefault();
//                             addToCart(p);
//                         }}
//                         className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition active:scale-90 translate-y-10 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100"
//                     >
//                         <ShoppingCart size={18} />
//                     </button>
//                 </div>
//             </Link>

//             <div className="p-3 flex flex-col gap-1">
//                 <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Top Seller</p>
//                 <Link href={`/product/${p.id}`}>
//                     <h3 className="font-semibold text-gray-900 truncate hover:text-blue-600 transition" title={p.name}>
//                         {p.name}
//                     </h3>
//                 </Link>
//                 <p className="font-bold text-lg text-gray-900">${p.price}</p>
//             </div>
//         </div>
//     );
// };

// --- COMPONENTE TARJETA (Copia y reemplaza este bloque al final del archivo) ---
const ProductCard = ({ p, addToCart, mobile }: { p: Product, addToCart: any, mobile: boolean }) => {
    return (
        <div className={`relative flex flex-col bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group/card ${mobile ? 'min-w-[160px] w-40 snap-start' : 'w-full'}`}>
            <Link href={`/product/${p.id}`}>
                {/* CAMBIO AQUÍ: aspect-square (Cuadrado) en lugar de aspect-[4/5] */}
                {/* También agregué p-2 para que la imagen no toque los bordes si quieres (opcional) */}
                <div className="relative w-full aspect-square overflow-hidden rounded-t-xl bg-gray-50">
                    <img
                        src={p.image}
                        alt={p.name}
                        // Usamos 'object-contain' si quieres que se vea TODA la imagen sin recortar
                        // O 'object-cover' si prefieres que llene todo el cuadrado
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    
                    {/* Botón flotante */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(p);
                        }}
                        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition active:scale-90 translate-y-10 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </Link>

            <div className="p-3 flex flex-col gap-1">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Top Seller</p>
                <Link href={`/product/${p.id}`}>
                    <h3 className="font-semibold text-gray-900 truncate hover:text-blue-600 transition" title={p.name}>
                        {p.name}
                    </h3>
                </Link>
                <p className="font-bold text-lg text-gray-900">${p.price}</p>
            </div>
        </div>
    );
};

export default TopSellers;

