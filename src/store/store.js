import { configureStore } from '@reduxjs/toolkit';
import offcanvasSlice from './offcanvas-slice';
import loginSlice from './loginForm-slice';
import changeSlice from './change-slice'
import registerSlice from './registerForm-slice';


const store = configureStore({
    reducer: {
        sideForm: offcanvasSlice.reducer,
        loginForm: loginSlice.reducer,
        registerForm: registerSlice.reducer,
        color: changeSlice.reducer,
    }
})

export default store;