import { signal, computed, effect } from '@preact/signals';

const savedCart = typeof localStorage !== "undefined"
 ? JSON.parse(localStorage.getItem("cart") || "[]")
 : [];

export const cartItems = signal(savedCart);

export const cartOpen = signal(false);

effect(() => {
    if(typeof localStorage !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cartItems.value));
    }
});

export const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

export const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

export function addToCart(item) {
  const existing = cartItems.value.find((i) => i.name === item.name);
  if (existing) {
    cartItems.value = cartItems.value.map((i) =>
      i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    cartItems.value = [...cartItems.value, { ...item, quantity: 1 }];
  }
}

export function removeFromCart(name) {
  cartItems.value = cartItems.value.filter((i) => i.name !== name);
}

export function clearCart() {
  cartItems.value = [];
}