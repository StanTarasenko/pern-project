// Modules
import { configureStore } from '@reduxjs/toolkit';

// Features
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';
import typeReducer from '../features/typeSlice';
import brandReducer from '../features/brandSlice';
import deviceReducer from '../features/deviceSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    type: typeReducer,
    brand: brandReducer,
    device: deviceReducer,
  },
});
