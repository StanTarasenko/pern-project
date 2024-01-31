// Modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Utils
import { $authHost, $host } from '../http';

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

export const createType = createAsyncThunk(
  "types/createType", 
  async (type) => {
    const response = await $authHost.post('api/type', type);
    return response.data;
});

export const deleteType = createAsyncThunk(
  "types/deleteType", 
  async (typeId) => {
    try {
      const response = await $authHost.delete(`api/type/${typeId}`);
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
    createStatus: 'idle',
    createError: null,
    removeStatus: 'idle',
    removeError: null,
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

    builder
        .addCase(createType.pending, (state) => {
        state.createStatus = 'loading';
      })
        .addCase(createType.fulfilled, (state) => {
        state.createStatus = 'succeeded';
      })
        .addCase(createType.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.error.message;
      });

    builder
      .addCase(deleteType.pending, (state) => {
        state.removeStatus = 'loading';
      })
      .addCase(deleteType.fulfilled, (state) => {
        state.removeStatus = 'succeeded';
      })
      .addCase(deleteType.rejected, (state, action) => {
        state.removeStatus = 'failed';
        state.removeError = action.error.message;
      });  
  },
});

export const { setTypeId, setTypes } = typeSlice.actions;

export const selectTypeId = (state) => state.type.typeId;
export const selectTypeList = (state) => state.type.typeList;
export const selectTypeStatus = (state) => state.type.status;
export const selectTypeError = (state) => state.type.error;
export const selectRemoveTypeStatus = (state) => state.type.removeStatus;
export const selectRemoveTypeError = (state) => state.type.removeError;
export const selectCreateTypeStatus = (state) => state.type.createStatus;
export const selectCreateTypeError = (state) => state.type.createError;

export default typeSlice.reducer;
