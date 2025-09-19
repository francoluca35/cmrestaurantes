import Image from "next/image"

export default function ChefSection() {
  return (
    <section className="relative overflow-visible h-[350px] sm:h-[400px] md:h-[450px]">
                    {/* Fondo con imagen */}
       <div className="absolute inset-0 bg-cover bg-center"
         style={{ 
           backgroundImage: "url('/Assets/fondo-interludio.jpg')"
         }}
       ></div>
       
       {/* Gradiente que difumina del color sólido hacia la imagen */}
       <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-violet-800/70 to-gray-800/60"></div>

             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
         <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
           
           {/* Lado izquierdo con color sólido */}
           <div className="h-full flex items-center justify-center">
             <div className="text-white text-center lg:text-left space-y-4 sm:space-y-6">
               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                 + <span className="text-white">Simplificamos,</span><br />
                 <span className="font-normal">para que nada falle.</span>
               </h2>
               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                 + <span className="text-white">Accesibilidad,</span><br />
                 <span className="font-normal">para que todo sea fácil.</span>
               </h2>
               <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                 + <span className="text-white">Innovamos,</span><br />
                 <span className="font-normal">para hacerlo mas rapido todo.</span>
               </h2>
             </div>
           </div>

           
         </div>
       </div>
    </section>
  )
}
