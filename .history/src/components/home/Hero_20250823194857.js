import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                TOP TOP
              </span>
              <span className="text-black ml-2">CHEF</span>
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold">
              Instant demo
            </button>
            <span className="text-gray-600 font-medium">Novedades</span>
            <button className="text-gray-600 hover:text-pink-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8">
            Somos la app gastronómica
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              que querés.
            </span>
          </h2>
          
          <div className="space-y-6 mb-12">
            <p className="text-2xl text-gray-700">
              <span className="font-semibold text-pink-500">+ Simplificamos,</span><br />
              para que nada falle.
            </p>
            <p className="text-2xl text-gray-700">
              <span className="font-semibold text-pink-500">+ Diseñamos,</span><br />
              para que todo sea fácil.
            </p>
            <p className="text-2xl text-gray-700">
              <span className="font-semibold text-pink-500">+ Innovamos,</span><br />
              para hacerlo mejor.
            </p>
          </div>
        </div>

        {/* Device Showcase */}
        <div className="relative flex justify-center items-center">
          {/* Left Tablet - Sales Dashboard */}
          <div className="relative z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              
              {/* Sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
              </div>

              {/* Main Content */}
              <div className="absolute left-16 right-0 top-0 bottom-0 p-4">
                {/* Turno Abierto */}
                <div className="bg-gray-700 rounded-lg p-3 mb-3">
                  <div className="text-white text-sm font-medium">Turno Abierto</div>
                  <div className="text-gray-300 text-xs">admin • 25 jul 17:00</div>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Cambiar</button>
                    <button className="bg-red-500 text-white text-xs px-2 py-1 rounded">Cerrar</button>
                    <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Informe</button>
                  </div>
                </div>

                {/* Ventas */}
                <div className="bg-gray-700 rounded-lg p-3 mb-3">
                  <div className="text-white text-sm font-medium mb-2">Ventas</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Salón</span>
                      <span className="text-white">$58.900</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Takeaway</span>
                      <span className="text-white">$27.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Delivery</span>
                      <span className="text-white">$54.100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Web</span>
                      <span className="text-white">$10.000</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Takeaway</button>
                    <button className="bg-pink-500 text-white text-xs px-2 py-1 rounded">Delivery</button>
                    <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Más</button>
                  </div>
                </div>

                {/* Dinero */}
                <div className="bg-gray-700 rounded-lg p-3 mb-3">
                  <div className="text-white text-sm font-medium mb-2">Dinero</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Efectivo</span>
                      <span className="text-white">$24.050</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tarjetas</span>
                      <span className="text-white">$61.500</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-green-500 text-white text-xs px-2 py-1 rounded">Egresar</button>
                    <button className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Aliviar</button>
                    <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Más</button>
                  </div>
                </div>

                {/* Stock */}
                <div className="bg-gray-700 rounded-lg p-3 mb-3">
                  <div className="text-white text-sm font-medium mb-2">Stock</div>
                  <div className="text-red-400 text-xs mb-2">Sin Stock: 76</div>
                  <div className="flex space-x-2">
                    <button className="bg-red-500 text-white text-xs px-2 py-1 rounded">Destruir</button>
                    <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Comp</button>
                  </div>
                </div>

                {/* Dispositivos */}
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="text-white text-sm font-medium mb-2">Dispositivos</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Conectados</span>
                      <span className="text-white">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Contratados</span>
                      <span className="text-white">10</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Agregar</button>
                    <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Mensaje para todos</button>
                    <button className="bg-gray-600 text-white text-xs px-2 py-1 rounded">Listado</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Tablet - Order Management */}
          <div className="relative z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300 mx-8">
            <div className="w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gray-800">
                <div className="flex justify-between items-center">
                  <div className="text-white font-medium">Mesa 002</div>
                  <div className="flex space-x-2">
                    <button className="w-6 h-6 bg-gray-700 rounded"></button>
                    <button className="w-6 h-6 bg-gray-700 rounded"></button>
                    <button className="w-6 h-6 bg-gray-700 rounded"></button>
                    <button className="w-6 h-6 bg-gray-700 rounded"></button>
                  </div>
                </div>
              </div>

              {/* Order List */}
              <div className="absolute top-16 left-0 right-0 bottom-20 p-4">
                <div className="bg-gray-700 rounded-lg p-3 h-full overflow-y-auto">
                  <div className="text-white text-sm font-medium mb-3">Producto</div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-gray-600 p-2 rounded">
                      <span className="text-white">Cafe Doppio</span>
                      <span className="text-gray-300">1</span>
                      <span className="text-gray-300">$800</span>
                      <span className="text-white">$800</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-600 p-2 rounded">
                      <span className="text-white">Coca Chica 500</span>
                      <span className="text-gray-300">1</span>
                      <span className="text-gray-300">$500</span>
                      <span className="text-white">$500</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-600 p-2 rounded">
                      <span className="text-white">Empanada Carne Picada</span>
                      <span className="text-gray-300">1</span>
                      <span className="text-gray-300">$1.200</span>
                      <span className="text-white">$1.200</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-600 p-2 rounded">
                      <span className="text-white">Empanada Humita</span>
                      <span className="text-gray-300">1</span>
                      <span className="text-gray-300">$1.200</span>
                      <span className="text-white">$1.200</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-600 p-2 rounded">
                      <span className="text-white">Levite Pera 1.5</span>
                      <span className="text-gray-300">1</span>
                      <span className="text-gray-300">$1.500</span>
                      <span className="text-white">$1.500</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-600 p-2 rounded">
                      <span className="text-white">Pizza Chica Calabresa</span>
                      <span className="text-gray-300">1</span>
                      <span className="text-gray-300">$6.000</span>
                      <span className="text-white">$6.000</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-600">
                    <div className="flex justify-between text-white font-medium">
                      <span>Total</span>
                      <span>$11.200</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800">
                <div className="flex space-x-2 mb-2">
                  <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded">Sin Descuento</button>
                  <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded">Nota</button>
                  <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded">Historial</button>
                </div>
                
                <div className="flex space-x-2 mb-2">
                  <button className="bg-cyan-500 text-white text-sm px-4 py-2 rounded flex-1">Marchar</button>
                  <button className="bg-cyan-500 text-white text-sm px-4 py-2 rounded flex-1">Transferir</button>
                  <button className="bg-cyan-500 text-white text-sm px-4 py-2 rounded flex-1">Modificar</button>
                </div>
                
                <button className="bg-green-500 text-white text-lg font-semibold w-full py-3 rounded mb-2">
                  + Adicionar
                </button>
                
                <div className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-xs">Cobrar al emitir...</span>
                </div>
                
                <div className="flex space-x-2 mb-2">
                  <button className="bg-pink-500 text-white text-xs px-2 py-1 rounded flex-1">Emitir Factura Cliente</button>
                  <button className="bg-pink-500 text-white text-xs px-2 py-1 rounded flex-1">Emitir Ticket Fiscal</button>
                  <button className="bg-pink-500 text-white text-xs px-2 py-1 rounded flex-1">Emitir Proforma</button>
                </div>
                
                <button className="bg-gray-600 text-white text-sm w-full py-2 rounded">
                  Salir
                </button>
              </div>
            </div>
          </div>

          {/* Right Tablet - Kitchen Display */}
          <div className="relative z-10 transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="w-80 h-96 bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              
              {/* Tabs */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gray-800">
                <div className="flex space-x-4">
                  <button className="bg-pink-500 text-white text-sm px-3 py-1 rounded">Pendientes</button>
                  <button className="bg-gray-600 text-white text-sm px-3 py-1 rounded">Terminadas</button>
                  <button className="bg-gray-600 text-white text-sm px-3 py-1 rounded">general</button>
                </div>
              </div>

              {/* Order Cards */}
              <div className="absolute top-16 left-0 right-0 bottom-0 p-4 overflow-y-auto">
                <div className="space-y-3">
                  {/* Order 1 */}
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Ped 3</span>
                      <span className="text-gray-300 text-xs">admin • 25 jul 17:01</span>
                    </div>
                    <div className="text-gray-300 text-xs space-y-1 mb-3">
                      <div>1 x Plato Ejemplo 05</div>
                      <div>1 x Empanada Carne Picada</div>
                      <div>1 x Pizza Chica Jamon</div>
                      <div>1 x Pizza Chica Huevo</div>
                      <div className="text-pink-400">barra</div>
                      <div>1 x Agua Grande 1.5</div>
                    </div>
                    <button className="bg-cyan-500 text-white text-sm w-full py-2 rounded">
                      Terminar
                    </button>
                  </div>

                  {/* Order 2 */}
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Ped 4</span>
                      <span className="text-gray-300 text-xs">admin • 25 jul 17:02</span>
                    </div>
                    <div className="text-gray-300 text-xs space-y-1 mb-3">
                      <div>1 x Empanada Carne Picada</div>
                      <div>1 x Empanada Humita</div>
                    </div>
                    <button className="bg-cyan-500 text-white text-sm w-full py-2 rounded">
                      Terminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smartphone - QR Code */}
          <div className="absolute -bottom-8 right-8 transform rotate-12 hover:rotate-0 transition-transform duration-300 z-30">
            <div className="w-32 h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl shadow-xl border-4 border-pink-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-900 rounded-xl m-1">
                <div className="absolute top-2 left-2 right-2 text-center">
                  <div className="text-white text-xs">Cuenta de Cliente</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-900 rounded"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex justify-center space-x-1">
                    <div className="w-3 h-3 bg-pink-500 rounded"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Icon */}
        <div className="absolute bottom-8 right-8">
          <button className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
