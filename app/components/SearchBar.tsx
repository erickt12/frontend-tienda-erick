"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react"; // Opcional: Agregué un icono de lupa para que se vea mejor

const STRAPI_URL = "https://backend-tienda-erick.onrender.com";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si la búsqueda está vacía o es muy corta, limpiamos y no hacemos nada
    if (query.trim().length === 0) {
      setFiltered([]);
      return;
    }

    // DEBOUNCE: Esperamos 500ms antes de pedir datos para no saturar al servidor
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        // Le pedimos a Strapi: "Filtra por Nombre que contenga (containsi) lo que escribí"
        const res = await fetch(
          `${STRAPI_URL}/api/productos?filters[Nombre][$containsi]=${query}&populate=*`
        );
        const json = await res.json();
        const { data } = json;

        // Mapeamos los datos igual que en los otros componentes
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

        setFiltered(formattedProducts);
      } catch (error) {
        console.error("Error buscando productos:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms de espera

    // Limpieza: Si el usuario sigue escribiendo, cancelamos el temporizador anterior
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Función para limpiar al hacer clic
  const handleProductClick = () => {
    setQuery("");
    setFiltered([]);
  };

  return (
    <section className="px-4 pt-0 pb-6 relative z-30">
      <div className="max-w-2xl mx-auto relative">
        {/* Input con Icono */}
        <div className="relative">
            <input
            type="text"
            placeholder="Buscar productos (ej: Laptops, iPhone...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            
            {/* Spinner de carga pequeño */}
            {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
            )}
        </div>

        {/* RESULTADOS FLOTANTES (Dropdown) */}
        {/* Esto hace que los resultados floten encima del contenido en lugar de empujarlo */}
        {filtered.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                onClick={handleProductClick}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-none"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded-md bg-gray-100"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {p.name}
                  </p>
                  <p className="text-blue-600 text-sm font-medium">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mensaje de "No encontrado" */}
        {query && !loading && filtered.length === 0 && query.length > 1 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center z-50">
            <p className="text-gray-500 text-sm">
              No encontramos nada con "{query}" 😢
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBar;


