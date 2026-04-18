import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null, 
  isLoading: true, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logoutUser, setAuthLoading } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;