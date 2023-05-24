import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'loginForm',
    initialState: { data: {username: '', password: ''}, errors: {}, loggedIn: false },
    reducers: {
        setData: (state, action) => {
            const formData = action.payload
            state.data = {
                username: formData.username,
                password: formData.password,
            };
        },
        setLoggedIn: (state) => {
            state.loggedIn = !state.loggedIn;
        }
    },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
