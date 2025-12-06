"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, ChevronRight } from "lucide-react"; // Agregué ChevronRight para la miga de pan
import { CartContext } from "@/app/components/context/CartContext";
import Link from "next/link";

const STRAPI_URL = "https://backend-tienda-erick.onrender.com";

// ⚠️ REVISA ESTO: ¿En tu Strapi es "categoria" o "categorias"?
const RELATION_NAME = "categoria"; 

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const CategoryPage = () => {
  const { category: categoryId } = useParams(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/productos?filters[${RELATION_NAME}][documentId][$eq]=${categoryId}&populate=*`
        );
        const json = await res.json();
        const { data } = json;

        if (data.length > 0) {
            const catData = data[0][RELATION_NAME] || data[0].attributes?.[RELATION_NAME]?.data;
            const catName = catData?.Nombre || catData?.nombre || "Categoría";
            setCategoryName(catName);
        }

        const formattedProducts = data.map((item: any) => {
          const imgField = item.Imagen || item.imagen;
          const imgUrlRelative = imgField?.url || imgField?.[0]?.url;
const finalImage = imgUrlRelative 
  ? (imgUrlRelative.startsWith('/') ? `${STRAPI_URL}${imgUrlRelative}` : imgUrlRelative)
  : "/placeholder.png";
  
          return {
            id: item.id,
            name: item.Nombre,
            price: item.Precio,
            image: finalImage,
            category: categoryName
          };
        });

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error al cargar productos", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Cargando...</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-10">
      <div className="container mx-auto px-4 max-w-screen-xl">
        
        {/* --- NUEVO: BREADCRUMBS (Ruta de navegación) --- */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-700 transition">Inicio</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-blue-900 capitalize">
            {categoryName || "Categoría"}
          </span>
        </div>

        {/* TÍTULO GRANDE */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
            {categoryName || "Explorar Productos"}
          </h1>
          <span className="text-gray-500 text-sm font-medium">
            {products.length} {products.length === 1 ? 'Producto' : 'Productos'}
          </span>
        </div>

        {/* CONTENIDO (Igual que antes) */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg mb-6">No se encontraron productos en esta categoría.</p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition shadow-md"
              >
                ← Volver al inicio
              </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1 group"
              >
                <Link href={`/product/${p.id}`}>
                  <div className="relative w-full overflow-hidden bg-gray-50 aspect-square">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(p);
                      }}
                      className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition active:scale-90 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </Link>

                <div className="flex flex-col justify-between p-3">
                  <Link href={`/product/${p.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 hover:text-blue-700 transition line-clamp-2 min-h-[40px]" title={p.name}>
                      {p.name}
                    </h3>
                  </Link>
                  <p className="mt-1 text-base font-bold text-gray-900">
                    ${p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-10 border-t border-gray-200 pt-6">
              <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
              >
              ← Volver al inicio
              </Link>
          </div>
        )}

      </div>
    </main>
  );
};

export default CategoryPage;