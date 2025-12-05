


// const Hero = () => {
//   return (
//     <section className="px-4 pt-10">
//         <div
//         className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-80"
//         style={{
//             backgroundImage: `
//             linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%),
//             url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDcyMe77ftOigK3hKsG7Ddtzi2Djaoj_Vetv9Np49IIblOY5ZvguGOjp8i5wlGPIaihnn4gCAk4lev9aSOrQme031bLTBCYRxdI2pWIagWaYeZsYK6HZaxun3caFIPpXmbaZCzeRG9eLcUWc7lAOTmzKYNYpYaQeKP2hPSefGMNx5H77A4EFjA4WVJws7nHYqAxIne3ok05bjGTgMTuoXGtrCdKJ2zNbb7bdr31_lP4oZQfF1xKXYDmvHLDMCqE4bYKxw47doDYhNE")
//             `,
//         }}
//         >
//             <div className="flex flex-col p-6 gap-4">
//                 <h2 className="text-white tracking-tight text-3xl font-bold leading-tight">
//                     El Futuro es Ahora
//                 </h2>
//                 <p className="text-white/90 text-base font-medium">
//                     Descubre lo ultimo en innovacion tecnologica
//                 </p>
//                 <button className="w-fit h-12 px-6 rounded-lg bg-primary hover:bg-blue-900 text-white font-bold tracking-wide">
//                     Explorar
//                 </button>
//             </div>
//         </div>
//     </section>
//   );
// };

// export default Hero;

import Link from "next/link"; // Asegúrate de importar Link si usas botones como enlaces

const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0">
        <picture>
          {/* Imagen para PC (Ancha - Setup Gamer Azul) */}
          <source 
            media="(min-width: 1024px)" 
            srcSet="https://images.unsplash.com/photo-1552831388-6a0b3575b32a?q=80&w=1920&auto=format&fit=crop" 
          />
          
          {/* Imagen para MÓVIL (Vertical - Luces Neón / Tech) */}
          {/* Usamos esta URL que es muy estable */}
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" 
            alt="Tecnología Innovadora"
            className="w-full h-full object-cover"
          />
        </picture>
        
        {/* Gradiente Negro encima de la foto para que el texto blanco resalte */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>

      {/* 2. CONTENIDO (TEXTO) */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl flex flex-col gap-6">
                
                <span className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full w-fit uppercase tracking-widest border border-white/20">
                    Nueva Colección 2025
                </span>
                
                <h2 className="text-white tracking-tight text-5xl md:text-7xl font-black leading-tight">
                    Tecnología <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        Sin Límites
                    </span>
                </h2>
                
                <p className="text-gray-200 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                    Los mejores gadgets del mercado con garantía oficial y envíos a todo el país.
                </p>
                
                <div className="flex gap-4 mt-4">
                    <button className="h-14 px-8 rounded-full bg-white text-blue-900 font-bold text-lg hover:bg-gray-100 transition shadow-lg active:scale-95">
                        Comprar Ahora
                    </button>

                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
