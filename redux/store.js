// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/auth/authSlice";

const store = configureStore({
    reducer: {
        // user: userReducer,
        auth: authReducer,
        // Dodajte ovde druge slice-ove kada ih kreirate
    },
});

export default store;