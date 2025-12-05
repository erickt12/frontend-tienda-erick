// "use client";

// import Link from "next/link";
// import { Laptop, Smartphone, Headphones, Gamepad } from "lucide-react";

// const categories = [
//   { id: "laptops", label: "Laptops", icon: Laptop },
//   { id: "phones", label: "Celulares", icon: Smartphone },
//   { id: "audio", label: "Auriculares", icon: Headphones },
//   { id: "gaming", label: "Gaming", icon: Gamepad },
// ];

// const Categories = () => {
//   return (
//     <section className="px-4 pt-4">
//       <h2 className="text-lg font-bold mb-3 text-black">Comprar por categoría</h2>

//       <div className="grid grid-cols-4 gap-4">
//         {categories.map((cat) => {
//           const Icon = cat.icon;
//           return (
//             <Link
//               key={cat.id}
//               href={`/category/${cat.id}`}
//               className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 shadow-sm active:scale-95 transition"
//             >
//               <Icon size={28} className="text-primary" />
//               <span className="text-xs font-medium text-gray-900">{cat.label}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Categories;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Laptop, Smartphone, Headphones, Gamepad, HelpCircle } from "lucide-react";

const STRAPI_URL = "https://backend-tienda-erick.onrender.com";

// Diccionario de Iconos (Deben coincidir con los nombres en Strapi)
const iconMap: Record<string, any> = {
  "Laptops": Laptop,
  "Celulares": Smartphone,
  "Auriculares": Headphones,
  "Gaming": Gamepad,
};

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/categorias`);
        const json = await res.json();
        const { data } = json;

        const formattedCats = data.map((item: any) => {
          // Buscamos el nombre (puede ser Nombre o nombre)
          const catName = item.Nombre || item.nombre; 
          
          return {
            id: item.documentId,
            label: catName,
            icon: iconMap[catName] || HelpCircle 
          };
        });

        setCategories(formattedCats);
      } catch (error) {
        console.error("Error cargando categorías", error);
      }
    };

    fetchCategories();
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="px-4 pt-8 pb-4">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Comprar por categoría</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              // CAMBIOS AQUÍ:
              // 1. 'h-32': Altura fija de 128px (más altos)
              // 2. 'justify-center': Centra el contenido verticalmente
              // 3. 'hover:-translate-y-1': Pequeño salto al pasar el mouse
              className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 active:scale-95 h-32 group"
            >
              {/* El icono crece un poco y cambia de color al pasar el mouse (group-hover) */}
              <Icon size={32} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
              
              <span className="text-sm font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;