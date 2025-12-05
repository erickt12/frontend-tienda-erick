"use client"

import { useState, useEffect } from "react"
import axios from "axios"

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

const ProductList = () =>{
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        async function loadProducts(){
            try{
                const response = await axios.get("http://localhost:3001/products");
                setProducts(response.data);
            } catch(error){
                console.error("Error loading products", error);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [])

    if (loading){
        return <p className="text-center text-gray-500">Loading products...</p>
    }

    return(
        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {products.map((product) =>(
                <article
                key={product.id}
        className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                    <img 
                    src={product.image} 
                    alt={product.image}
                    className="w-full h-40 object-cover rounded mb-3"
                />

                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.price}</p>
                <p className="text-sm text-gray-400">{product.category}</p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">add to cart</button>
                </article>


            ))}
        </section>
    )

}


export default ProductList;