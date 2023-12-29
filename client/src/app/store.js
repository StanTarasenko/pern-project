import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import userReducer from '../features/userSlice';
import typeReducer from '../features/typeSlice';
import brandReducer from '../features/brandSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    type: typeReducer,
    brand: brandReducer,
  },
});
