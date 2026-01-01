



// import { createSlice } from '@reduxjs/toolkit';
// import carData from '../data.json';

// const inventorySlice = createSlice({
//   name: 'inventory',
//   initialState: carData,
//   reducers: {
//     decrementCar: (state, action) => {
//       const car = state.find(c => c.id === action.payload.id);
//       if (car) {
//         car.stock -= action.payload.quantity || 1;
//         // Ensure stock doesn't go negative
//         if (car.stock < 0) car.stock = 0;
//       }
//     },
//     incrementCar: (state, action) => {
//       const car = state.find(c => c.id === action.payload.id);
//       if (car) {
//         car.stock += action.payload.quantity || 1;
//       }
//     }
//   }
// });

// export const { decrementCar, incrementCar } = inventorySlice.actions;
// export default inventorySlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCars, updateCarStock } from '../services/api';

// Async thunk to fetch cars from backend
export const fetchCars = createAsyncThunk(
  'inventory/fetchCars',
  async (filters, { rejectWithValue }) => {
    try {
      return await getCars(filters);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update stock
export const updateStock = createAsyncThunk(
  'inventory/updateStock',
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      await updateCarStock(id, stock);
      return { id, stock };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    cars: [],
    loading: false,
    error: null
  },
  reducers: {
    // Keep local decrement for immediate UI update
    decrementCar: (state, action) => {
      const car = state.cars.find(c => c.id === action.payload.id);
      if (car) {
        car.stock -= action.payload.quantity || 1;
        if (car.stock < 0) car.stock = 0;
      }
    },
    incrementCar: (state, action) => {
      const car = state.cars.find(c => c.id === action.payload.id);
      if (car) {
        car.stock += action.payload.quantity || 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update stock
      .addCase(updateStock.fulfilled, (state, action) => {
        const car = state.cars.find(c => c.id === action.payload.id);
        if (car) {
          car.stock = action.payload.stock;
        }
      });
  }
});

export const { decrementCar, incrementCar } = inventorySlice.actions;
export default inventorySlice.reducer;