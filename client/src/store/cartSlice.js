
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOneFromCart: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
    removeAllFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => []
  }
});

export const { 
  addToCart, 
  removeOneFromCart, 
  removeAllFromCart, 
  clearCart 
} = cartSlice.actions;
export default cartSlice.reducer;