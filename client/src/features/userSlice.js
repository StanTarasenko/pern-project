import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: {},
    notifyData: {},
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setNotifyData: (state, action) => {
      state.notifyData = action.payload;
    },
  },
});

export const { setIsAuth, setUser, setNotifyData } = userSlice.actions;

export const selectIsAuth = (state) => state.user.isAuth;
export const selectUser = (state) => state.user.user;
export const selectNotifyData = (state) => state.user.notifyData;

export default userSlice.reducer;
