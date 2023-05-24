import { createSlice } from "@reduxjs/toolkit";

const sideFormSlice = createSlice({
    name: 'sideForm',
    initialState: { showLogin: false, showRegister: false },
    reducers: {
        setLogin: (state) => {
            state.showLogin = !state.showLogin;
        },
        setRegister: (state) =>{
            state.showRegister = !state.showRegister;
        }
    },
});

export const sideFormActions = sideFormSlice.actions;

export default sideFormSlice;
