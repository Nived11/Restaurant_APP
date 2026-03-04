import { createSlice } from '@reduxjs/toolkit';

const savedLocation = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user_location")) : null;

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: savedLocation || {
      address: "Select Location",
      lat: null,
      lng: null,
      pincode: ""
    },
    isChecking: false,
    errorPopup: null, 
  },
  reducers: {
    setLocation: (state, action) => {
      state.currentLocation = action.payload;
      state.isChecking = false;
      state.errorPopup = null;
      
      localStorage.setItem("user_location", JSON.stringify(action.payload));
    },
    setChecking: (state, action) => {
      state.isChecking = action.payload;
    },
    setErrorPopup: (state, action) => {
      state.errorPopup = action.payload;
      state.isChecking = false;
    },
    clearError: (state) => {
      state.errorPopup = null;
    }
  }
});

export const { setLocation, setChecking, setErrorPopup, clearError } = locationSlice.actions;
export default locationSlice.reducer;