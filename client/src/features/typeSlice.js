// Modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTypes = createAsyncThunk(
  "typeList/getTypes", 
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/type"
      );
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
  },
  reducers: {},
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

// export const { setAllTypes } = typeSlice.actions;

export const selectTypeList = (state) => state.type.typeList;
export const selectTypeStatus = (state) => state.type.status;
export const selectTypeError = (state) => state.type.error;

export default typeSlice.reducer;
