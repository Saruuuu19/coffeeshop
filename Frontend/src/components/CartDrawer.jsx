import { cartItems, cartOpen, cartTotal, removeFromCart, clearCart } from "../store/cart.js";

export default function CartDrawer() {
  return (
    <>
      {/* Overlay */}
      {cartOpen.value && (
        <div
          class="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => (cartOpen.value = false)}
        />
      )}

      {/* Drawer */}
      <div
        class={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          cartOpen.value ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div class="flex items-center justify-between px-6 py-4 bg-[#233F4C] text-white">
          <h2 class="text-xl font-bold">Your Order</h2>
          <button
            onClick={() => (cartOpen.value = false)}
            class="material-icons hover:text-[#B45F3D] transition-colors"
          >
            close
          </button>
        </div>

        {/* Items */}
        <div class="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.value.length === 0 ? (
            <div class="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <span class="material-icons text-6xl">coffee</span>
              <p class="text-lg font-medium">Your cart is empty</p>
              <p class="text-sm text-center">Add something from the menu to get started</p>
            </div>
          ) : (
            <ul class="space-y-4">
              {cartItems.value.map((item) => (
                <li key={item.name} class="flex items-center gap-4 bg-[#F5F1E8] rounded-xl p-3">
                  {/* Imagen o fallback */}
                  {item.imageUrl ? (
                    <img
                      src={`${item.imageUrl}?w=100&h=100&fit=fill`}
                      alt={item.name}
                      class="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div class="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                      <span class="material-icons text-gray-400">coffee</span>
                    </div>
                  )}

                  {/* Info */}
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-[#233F4C] truncate">{item.name}</p>
                    <p class="text-sm text-gray-500">x{item.quantity}</p>
                    <p class="text-sm font-bold text-[#265738]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeFromCart(item.name)}
                    class="material-icons text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    delete_outline
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer con total */}
        {cartItems.value.length > 0 && (
          <div class="px-6 py-4 border-t border-gray-200 space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 font-medium">Total</span>
              <span class="text-2xl font-bold text-[#233F4C]">
                ${cartTotal.value.toFixed(2)}
              </span>
            </div>
            <button class="w-full bg-[#B45F3D] hover:bg-[#9a4f33] text-white font-bold py-3 rounded-xl transition-all duration-300 active:scale-95">
              Proceed to Checkout
            </button>
            <button
              onClick={() => clearCart()}
              class="w-full text-sm text-gray-400 hover:text-red-500 transition-colors py-1"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}