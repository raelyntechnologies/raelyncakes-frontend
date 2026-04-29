import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cake, CartItem } from "@/types/cake";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        cake: Cake;
        weight: number;
        message?: string;
        notes?: string;
      }>
    ) => {
      const { cake, weight, message, notes } = action.payload;
      const existingItem = state.items.find(
        (item) => item.cake.id === cake.id && item.weight === weight
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ cake, quantity: 1, weight, message, notes });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; weight: number }>
    ) => {
      const { id, weight } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.cake.id === id && item.weight === weight)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; weight: number; quantity: number }>
    ) => {
      const { id, weight, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.cake.id === id && item.weight === weight
      );
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(
            (i) => !(i.cake.id === id && i.weight === weight)
          );
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.cake.price * item.weight * item.quantity,
    0
  );
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;

export default cartSlice.reducer;
