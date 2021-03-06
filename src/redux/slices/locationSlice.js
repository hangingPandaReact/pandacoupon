import {createSlice} from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'counter',
  initialState: {
    location: {},
  },
  
  reducers: {
      updateCurrentLocation(state, action) {
      state.location = action.payload;
    },
    resetCurrentLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const {updateCurrentLocation, resetCurrentLocation} =
  locationSlice.actions;

export default locationSlice.reducer;
