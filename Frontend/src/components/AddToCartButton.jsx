import {addToCart} from "../store/cart.js";

export default function AddToCartButton( { item }) {
    return (
        <button
        onClick={() => addToCart(item)}
        class = "w-full bg-[#233F4C] hover:bg-[#142040] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95">
            <span>Add to Order</span>
            <span class="material-icons text-sm">
                add_shopping_cart
            </span>
        </button>
    )
}