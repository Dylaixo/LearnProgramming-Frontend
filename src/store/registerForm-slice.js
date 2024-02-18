import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name: 'registerForm',
    initialState: { data: { username: '', email: '', password: '', password2: '' }, authCode: '', isAuth: false },
    reducers: {
        setData: (state, action) => {
            const formData = action.payload
            state.data = {
                username: formData.username,
                password: formData.password,
                password2: formData.password2,
                email: formData.email
            };
        },
        setAuthCode: (state, action) => {
            const code = action.payload
            state.authCode = code;
        },
        setIsCode: (state) =>{
            state.isAuth = !state.isAuth;
        }
    },
});

export const registerActions = registerSlice.actions;

export default registerSlice;
