// Modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBrands = createAsyncThunk(
  "brandList/getBrands", 
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/brand"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

export const brandSlice = createSlice({
  name: 'type',
  initialState: {
    brandList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getBrands.pending, (state) => {
        state.status = 'loading';
      })
        .addCase(getBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brandList = action.payload;
      })
        .addCase(getBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    },
});

export const selectBrandList = (state) => state.brand.brandList;
export const selectBrandStatus = (state) => state.brand.status;
export const selectBrandError = (state) => state.brand.error;

export default brandSlice.reducer;
