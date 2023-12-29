import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: {}
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuth, setUser } = userSlice.actions;

export const selectIsAuth = (state) => state.user.isAuth;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
