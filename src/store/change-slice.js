import { createSlice } from '@reduxjs/toolkit';

const changeSlice = createSlice({
  name: 'color',
  initialState: {isChanged: false},
  reducers: {
    setColor: (state) => {
      state.isChanged = true;
    },
    unsetColor: (state) => {
      state.isChanged = false;
    }
  }
});

export const changeActions = changeSlice.actions;

export default changeSlice;
