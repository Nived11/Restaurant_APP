import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: {
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