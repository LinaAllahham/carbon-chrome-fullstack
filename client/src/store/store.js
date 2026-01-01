



import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageSlice';
import cartReducer from './cartSlice';
import inventoryReducer from './inventorySlice';

// Load cart from localStorage if it exists
const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : undefined;
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    page: pageReducer,
    cart: cartReducer,
    inventory: inventoryReducer
  },
  preloadedState: {
    cart: loadCart() || [] // Initialize with saved cart or empty array
  }
});

// Subscribe to cart changes and save to localStorage
store.subscribe(() => {
  const cart = store.getState().cart;
  localStorage.setItem('cart', JSON.stringify(cart));
});
