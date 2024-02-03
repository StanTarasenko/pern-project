// Modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Utils
import { $host } from '../http';

export const getBaskets = createAsyncThunk(
  "basketList/getBaskets", 
  async () => {
    try {
      const response = await $host.get(`api/basket`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

export const getBasketById = createAsyncThunk(
  "basketById/getBasketById", 
  async (basketId) => {
    try {
      const response = await $host.get(`api/basket/${basketId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

export const addDeviceToBasket = createAsyncThunk(
  "deviceToBasket/addDeviceToBasket",
  async (devices, basketId) => {
    try {
      const { data } = await $host.post(`api/basket/${basketId}`, devices);
      return data;
    } catch (error) {
      console.error(error);
    }
  });

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basketList: {},
    status: 'idle',
    error: null,
    basketById: {},
    statusById: 'idle',
    errorById: null,
  },

  reducers: {
    setStatusById: (state, action) => {
      state.statusById = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
        .addCase(getBasketById.pending, (state) => {
        state.statusById = 'loading';
      })
        .addCase(getBasketById.fulfilled, (state, action) => {
        state.statusById = 'succeeded';
        state.deviceById = action.payload;
      })
        .addCase(getBasketById.rejected, (state, action) => {
        state.statusById = 'failed';
        state.errorById = action.error.message;
      });
  }
});
