// Sidebar usando Preact
import { useState } from 'preact/hooks';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Clase que controla el desplazamiento del menú lateral
  const sidebarClasses = isOpen
    ? 'translate-x-0' // Menú abierto: se muestra
    : 'translate-x-full'; // Menú cerrado: se oculta fuera de la pantalla

  return (
    <div class="relative">
      {/* Botón de Menú de Hamburguesa (Manteniendo la estructura original) */}
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        class="flex items-center justify-center h-10 w-10 hover:bg-gray-200 rounded-full ease-in-out duration-50 focus:outline-none focus:ring-2 focus:ring-[#B45F3D]"
      >
        {/* Ícono SVG de Hamburguesa original (adaptado para que se vea) */}
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path fill="black" d="M8.00001 36C7.43334 36 6.95867 35.808 6.57601 35.424C6.19334 35.04 6.00134 34.5653 6.00001 34C5.99867 33.4347 6.19067 32.96 6.57601 32.576C6.96134 32.192 7.43601 32 8.00001 32H40C40.5667 32 41.042 32.192 41.426 32.576C41.81 32.96 42.0013 33.4347 42 34C41.9987 34.5653 41.8067 35.0407 41.424 35.426C41.0413 35.8113 40.5667 36.0027 40 36H8.00001ZM8.00001 26C7.43334 26 6.95867 25.808 6.57601 25.424C6.19334 25.04 6.00134 24.5653 6.00001 24C5.99867 23.4347 6.19067 22.96 6.57601 22.576C6.96134 22.192 7.43601 22 8.00001 22H40C40.5667 22 41.042 22.192 41.426 22.576C41.81 22.96 42.0013 23.4347 42 24C41.9987 24.5653 41.8067 25.0407 41.424 25.426C41.0413 25.8113 40.5667 26.0027 40 26H8.00001ZM8.00001 16C7.43334 16 6.95867 15.808 6.57601 15.424C6.19334 15.04 6.00134 14.5653 6.00001 14C5.99867 13.4347 6.19067 12.96 6.57601 12.576C6.96134 12.192 7.43601 12 8.00001 12H40C40.5667 12 41.042 12.192 41.426 12.576C41.81 12.96 42.0013 13.4347 42 14C41.9987 14.5653 41.8067 15.0407 41.424 15.426C41.0413 15.8113 40.5667 16.0027 40 16H8.00001Z" />
        </svg>
      </button>

      {/* Menú Sidebar */}
      <nav
        // El menú se posiciona fijo en el borde derecho, ocupa toda la altura y tiene una transición suave
        class={`fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl z-50 transform ${sidebarClasses} transition-transform duration-300 ease-in-out`}
      >
        {/* Header del Sidebar con el botón de cerrar */}
        <div class="p-4 flex justify-between items-center border-b border-gray-200">
          <span class="text-xl font-bold text-[#B45F3D]">Navigation</span>
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            class="text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            {/* Ícono X de cerrar */}
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Enlaces del Menú */}
        <ul class="flex flex-col p-4 space-y-2">
          <li><a href="/" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Home</a></li>
          <li><a href="/menu" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Our Menu</a></li>
          <li><a href="/location" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Location</a></li>
          <li><a href="/about" class="block px-3 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">About us</a></li>
          <li class="pt-4"><a href="/menu" class="block text-center px-4 py-2 bg-[#B45F3D] text-white rounded-full font-bold hover:bg-[#B45F3D]/90">Start an order</a></li>
        </ul>
      </nav>

      {/* Overlay Oscuro (se muestra cuando el menú está abierto) */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          class="fixed inset-0 bg-black opacity-70 z-40 transition-opacity duration-300"
        ></div>
      )}
    </div>
  );
}