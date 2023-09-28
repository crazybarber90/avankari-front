// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/auth/authSlice";
import translationReducer from "./features/translationSlice"

const store = configureStore({
    reducer: {
        // user: userReducer,
        auth: authReducer,
        translation: translationReducer,

        // Dodajte ovde druge slice-ove kada ih kreirate
    },
});

export default store;