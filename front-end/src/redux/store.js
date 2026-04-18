import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import locationReducer from './locationSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    location: locationReducer,
    auth: authReducer, 
  },
});