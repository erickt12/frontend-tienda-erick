// import Categories from "./components/Categories";
// import Hero from "./components/Hero";

// import SearchBar from "./components/SearchBar";
// import TopSellers from "./components/TopSellers";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-100">
//       <section >
//         <h1 className="text-2xl font-bold">ElectroShop</h1>
//       </section>
//       <Hero />
//       <SearchBar />
//       <Categories />
//       <TopSellers />

//     </main>
//   );
// }

import Categories from "./components/Categories";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import TopSellers from "./components/TopSellers";

export default function Home() {
  return (
    // QUITAMOS 'pt-20'. Dejamos 'min-h-screen'
    <main className="min-h-screen bg-gray-50 pb-10">
      
      {/* El Hero va primero y ocupará toda la pantalla inicial */}
      <Hero />
      
      {/* El resto del contenido sí necesita un contenedor para no pegarse a los bordes */}
      <div className="container mx-auto max-w-screen-xl space-y-12 mt-12">
        
        {/* El buscador un poco separado del Hero */}
        <div className="max-w-2xl mx-auto px-4 -mt-8 relative z-20">
           <SearchBar />
        </div>
        
        <Categories />
        <TopSellers />
      </div>

    </main>
  );
}
