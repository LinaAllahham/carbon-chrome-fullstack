import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',
  initialState: 'home',
  reducers: {
    setPage: (state, action) => action.payload
  }
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;

