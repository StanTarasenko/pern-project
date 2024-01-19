// Modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Utils
import { $host } from '../http';

export const getDevices = createAsyncThunk(
  "deviceList/getDevices", 
  async ({ typeId, brandId, page, limit }) => {
    try {
      const response = await $host.get(`api/device`, {
        params: { typeId, brandId, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

export const getDeviceById = createAsyncThunk(
  "deviceById/getDeviceById", 
  async (deviceId) => {
    try {
      const response = await $host.get(`api/device/${deviceId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

export const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    deviceList: {},
    status: 'idle',
    error: null,
    deviceById: {},
    statusById: 'idle',
    errorById: null,
    page: 1,
    totalCount: 0,
    pageLimit: 0
  },

  reducers: {
    setStatusById: (state, action) => {
      state.statusById = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setLimit: (state, action) => {
      state.pageLimit = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
        .addCase(getDevices.pending, (state) => {
        state.status = 'loading';
      })
        .addCase(getDevices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deviceList = action.payload;
      })
        .addCase(getDevices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
        .addCase(getDeviceById.pending, (state) => {
        state.statusById = 'loading';
      })
        .addCase(getDeviceById.fulfilled, (state, action) => {
        state.statusById = 'succeeded';
        state.deviceById = action.payload;
      })
        .addCase(getDeviceById.rejected, (state, action) => {
        state.statusById = 'failed';
        state.errorById = action.error.message;
      });  
    },
});

export const { setStatusById, setPage, setLimit, setTotalCount } = deviceSlice.actions;

export const selectDeviceById = (state) => state.device.deviceById;
export const selectDeviceByIdStatus = (state) => state.device.statusById;
export const selectDeviceByIdError = (state) => state.device.errorById;

export const selectDeviceList = (state) => state.device.deviceList;
export const selectDeviceStatus = (state) => state.device.status;
export const selectDeviceError = (state) => state.device.error;

export const selectDevicePage = (state) => state.device.page;
export const selectDeviceTotalCount = (state) => state.device.totalCount;
export const selectDeviceLimit = (state) => state.device.pageLimit;

export default deviceSlice.reducer;
