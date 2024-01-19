// Modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Utils
import { $host } from '../http';

export const getBrands = createAsyncThunk(
  "brandList/getBrands", 
  async () => {
    try {
      const response = await $host.get(`api/brand`);
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
    brandId: 0,
  },
  reducers: {
    setBrandId: (state, action) => {
      state.brandId = action.payload;
    },
    setBrands: (state, action) => {
      state.brandList = action.payload;
    }
  },
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

export const { setBrandId, setBrands } = brandSlice.actions;

export const selectBrandId = (state) => state.brand.brandId;
export const selectBrandList = (state) => state.brand.brandList;
export const selectBrandStatus = (state) => state.brand.status;
export const selectBrandError = (state) => state.brand.error;

export default brandSlice.reducer;
