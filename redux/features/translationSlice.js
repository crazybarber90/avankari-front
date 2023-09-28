import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";


const setLanguage = (language) => {
    let messages = {};
    switch (language) {
        case "en":
            messages = Object.assign(messages, require(`../../translation/en.json`))
            break;
        default:
        case "srp":
            messages = Object.assign(messages, require(`../../translation/srp.json`))
            break;
    }
    return messages;
};


const initialState = {
    locale: "srp",
    messages: setLanguage("srp")
}





const translationSlice = createSlice({
    name: "translation",
    initialState,
    reducers: {
        SET_LANGUAGE(state = initialState, action) {
            if (action === undefined) return state;
            const newLocale = action.payload.locale;
            const newMessages = setLanguage(newLocale);


            // Cuvanje odabranog jezika u AsyncStorage
            AsyncStorage.setItem('selectedLanguage', newLocale);

            return {
                locale: newLocale,
                messages: newMessages
            }

        }
    }
})


export const { SET_LANGUAGE } = translationSlice.actions;
export const translation = (state) => state.translation.mesages;

export default translationSlice.reducer