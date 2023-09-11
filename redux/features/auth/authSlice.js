import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogedIn: false,
    resetPassEmail: "",
    user: {
        name: "",
        email: "",
        bio: "",
        photo: "",
        picture: "",
    },
    userID: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // set IsLogedIn to boolean from action.payload
        SET_LOGIN(state, action) {
            state.isLogedIn = action.payload;
        },
        SET_NAME(state, action) {
            state.name = action.payload;
        },
        SET_EMAIL(state, action) {
            state.resetPassEmail = action.payload;
        },
        // save user credentials to redux
        SET_USER(state, action) {
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phone = profile.phone;
            state.user.bio = profile.bio;
            state.user.photo = profile.photo;
            state.user.picture = profile.picture;
        },
        LOGOUT_USER(state, action) {
            state.user = initialState.user;
        },
        // Akcija za učitavanje korisnika iz AsyncStorage-a
        LOAD_USER(state) {
            AsyncStorage.getItem('@user')
                .then((userJSON) => {
                    if (userJSON) {
                        const profile = JSON.parse(userJSON);
                        state.user.name = profile.name;
                        state.user.email = profile.email;
                        state.user.phone = profile.phone;
                        state.user.bio = profile.bio;
                        state.user.photo = profile.photo;
                        state.user.picture = profile.picture;
                    }
                })
                .catch((error) => {
                    console.error('Error loading user from AsyncStorage:', error);
                });
        },

    },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_EMAIL, LOAD_USER, LOGOUT_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLogedIn;
export const selectName = (state) => state.auth.name;
export const selectEmail = (state) => state.auth.resetPassEmail;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
