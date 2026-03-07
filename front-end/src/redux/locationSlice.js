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
    workingHours: null, 
    isOpen: true, // പുതിയ സ്റ്റേറ്റ്
    isChecking: true, 
    errorPopup: null, 
  },
  reducers: {
    setLocation: (state, action) => {
      const data = action.payload;
      const { workingHours, isOpen, ...locationData } = data;
      
      state.currentLocation = {
        ...state.currentLocation,
        ...locationData
      };
      
      if (workingHours) {
        state.workingHours = workingHours;
      }

      if (isOpen !== undefined) {
        state.isOpen = isOpen;
      }
      
      state.isChecking = false;
      state.errorPopup = null;
      
      localStorage.setItem("user_location", JSON.stringify(state.currentLocation));
    },
    setChecking: (state, action) => {
      state.isChecking = action.payload;
    },
    setErrorPopup: (state, action) => {
      if (typeof action.payload === 'object' && action.payload.workingHours) {
          state.workingHours = action.payload.workingHours;
          state.errorPopup = action.payload.message;
          if (action.payload.isOpen !== undefined) state.isOpen = action.payload.isOpen;
      } else {
          state.errorPopup = action.payload;
      }
      state.isChecking = false;
    },
    clearError: (state) => {
      state.errorPopup = null;
    }
  }
});

export const { setLocation, setChecking, setErrorPopup, clearError } = locationSlice.actions;
export default locationSlice.reducer;