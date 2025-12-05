"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { CartContext } from "@/app/components/context/CartContext";
import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";

const STRAPI_URL = "https://backend-tienda-erick.onrender.com";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/productos?filters[id][$eq]=${id}&populate=*`);
        const json = await res.json();
        
        const item = json.data[0];

        if (item) {
          const imgField = item.Imagen || item.imagen;
          const imgUrlRelative = imgField?.url || imgField?.[0]?.url;
          const finalImage = imgUrlRelative ? `${STRAPI_URL}${imgUrlRelative}` : "/placeholder.png";

          let descriptionText = "Sin descripción";
          if (item.Descripcion && Array.isArray(item.Descripcion)) {
            descriptionText = item.Descripcion.map((block: any) => 
              block.children?.map((child: any) => child.text).join(" ")
            ).join("\n\n");
          } else if (typeof item.Descripcion === 'string') {
             descriptionText = item.Descripcion;
          }

          setProduct({
            id: item.id,
            name: item.Nombre,
            price: item.Precio,
            image: finalImage,
            description: descriptionText,
            category: "General"
          });
        }
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Producto no encontrado</p>
      </div>
    );

  return (
    // CAMBIO 1: pt-32 para bajar el contenido y que no lo tape el Navbar
    <main className="bg-gray-50 min-h-screen container mx-auto px-4 pt-32 pb-12">
      
      {/* Breadcrumb pequeño (Opcional, queda bien) */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-700 transition">Inicio</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-blue-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <div className="flex justify-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            // CAMBIO 2: max-w-[400px] para hacerla más chica
            className="rounded-xl w-full max-w-[400px] object-contain aspect-square"
          />
        </div>

        {/* COLUMNA DERECHA: INFO */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>

          {/* CAMBIO 3: Solo estrellas, sin texto de reseñas */}
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill="currentColor" stroke="none" size={24} />
            ))}
          </div>

          <p className="text-4xl font-bold text-blue-700">${product.price}</p>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 rounded-l-md transition"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-medium text-gray-900">{qty}</span>
              <button
                className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 rounded-r-md transition"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            <button
              className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg active:scale-95"
              onClick={() => addToCart({ ...product, qty })}
            >
              🛒 Agregar al carrito
            </button>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción del producto</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;