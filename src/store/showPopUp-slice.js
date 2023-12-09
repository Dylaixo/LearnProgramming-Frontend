import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {show: false},
  reducers: {
    setShow: (state) => {
      state.show = true;
    },
    unsetShow: (state) => {
      state.show = false;
    }
  }
});

export const popupActions = popupSlice.actions;

export default popupSlice;
