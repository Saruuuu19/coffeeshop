import { cartCount } from "../store/cart.js";
import { cartOpen } from "../store/cart.js";

export default function CartIcon() {
    return (
        <button
        onClick={() => cartOpen.value = true}
        class = "relative flex items-center justify-center text-[#233F4C] hover:text-[#B45F3D] transition-colors" aria-label="Open Cart">
            <span class="material-icons text-2xl">shopping_cart</span>
            {cartCount.value > 0 && (
                <span class="absolute -top-1 -right-1 bg-[#B45F3D] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount.value}
                </span>
            )}
        </button>
    )
}