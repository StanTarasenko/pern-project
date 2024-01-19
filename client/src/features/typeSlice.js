// Modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Utils
import { $host } from '../http';

export const getTypes = createAsyncThunk(
  "typeList/getTypes", 
  async () => {
    try {
      const response = await $host.get(`api/type`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    typeList: [],
    status: 'idle',
    error: null,
    typeId: 0,
  },
  reducers: {
    setTypeId: (state, action) => {
      state.typeId = action.payload;
    },
    setTypes: (state, action) => {
      state.typeList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getTypes.pending, (state) => {
        state.status = 'loading';
      })
        .addCase(getTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.typeList = action.payload;
      })
        .addCase(getTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setTypeId, setTypes } = typeSlice.actions;

export const selectTypeId = (state) => state.type.typeId;
export const selectTypeList = (state) => state.type.typeList;
export const selectTypeStatus = (state) => state.type.status;
export const selectTypeError = (state) => state.type.error;

export default typeSlice.reducer;
