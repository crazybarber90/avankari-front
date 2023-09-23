import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octicons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';
import { SET_USER, selectUser, LOGOUT_USER } from '../../redux/features/auth/authSlice';
import bg from "../../assets/img/bg.png"

import {
    CustomFont,
    Colors,
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    SyledSelectPicker,
    StyledPickerLabel,
    StyledTextInputWithImage,
    StyledImage,
    StyledTableInputSocial,
    StyledButtonTable,

} from '../../components/styles';

import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
const { brand, darkLight, primary, search } = Colors;
const UserProfile = ({ navigation, route }) => {

    const [messageType, setMessageType] = useState();
    const [message, setMessage] = useState();
    const [messageFor, setMessageFor] = useState();
    const [table, setTable] = useState('');


    const dispatch = useDispatch()
    const currentUser = useSelector(selectUser)

    const handleMesage = (message, type = 'FAILED',) => {
        setMessage(message);
        setMessageType(type);

        // timeout da sakrijete poruku nakon 5 sekundi
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 5000);
    };

    // console.log("TOKEN IZ USER DETAILS", token)
    const handleUpdateUser = async (credentials, setSubmitting) => {

        // setSubmitting(true);
        // const filterValues = (obj) => {
        //     const filtered = {};
        //     for (const key in obj) {
        //         if (!obj[key].startsWith(`Odaberi`)) {
        //             filtered[key] = obj[key];
        //         }
        //     }
        //     return filtered;
        // };
        const filterValues = (obj) => {
            const filtered = {};
            for (const key in obj) {
                if (obj[key].toLowerCase() !== "odaberi" && !obj[key].toLowerCase().startsWith("odaberi")) {
                    filtered[key] = obj[key].toLowerCase();
                }
            }
            return filtered;
        };


        const filteredCredentials = filterValues(credentials);

        // console.log("FLITRIRANIKREDENCIJALI IZ SEARCH", filteredCredentials)
        // console.log("KREDENCIJALI IZ SEARCH", credentials)
        try {
            setSubmitting(false)
            const token = await AsyncStorage.getItem("@token");

            if (!token) {
                handleMesage('Token nije dostupan.');
                setSubmitting(false);
                return;
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const url = 'http://192.168.0.13:4000/api/users/search-user';
            const response = await axios.post(url, filteredCredentials, { headers });

            if (response.status === 200) {
                console.log("------------------------------------")
                console.log('Search successfully');
                console.log("------------------------------------")
                navigation.navigate('SearchList', { responseData: response.data.users });
            }
            // navigation.navigate('Home', { ...response.data });
            // navigation.navigate('Home');
            // OVDE MORA DA SALJE NA STRANICU searchList sa response, ako ima, ako nema da salje na NOT FOUND STRANICU


            setSubmitting(false);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            // setSubmitting(false);
            handleMesage(message);
        }
    }

    // SEARCH BY TABLE
    const updateTable = async () => {
        //ovde se salje i response, trebao bi da bude niz usera
        // navigation.navigate('SearchList');
        const cleanedTable = table.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        // console.log(cleanedString);
        // return console.log("-------------------------------------TABLE ", cleanedString)
        try {
            const token = await AsyncStorage.getItem("@token");

            if (!token) {
                handleMesage('Token nije dostupan.');
                // setSubmitting(false);
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const url = 'http://192.168.0.13:4000/api/users/search-by-table';

            setMessageFor("table")
            const response = await axios.post(url, { table: cleanedTable }, { headers });
            // return console.log("RESPONSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", table)

            if (response.status === 200) {
                console.log("------------------------------------")
                console.log('Search successfully');
                console.log("------------------------------------")
                navigation.navigate('SearchList', { responseData: response.data.users });
            }
            return response.data;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            // setSubmitting(false);
            handleMesage(message);
        }
    }

    // console.log("CURENT U PROFILE", currentUser)
    //ovo je objekat koji saljem na backend,zelim da ovaj ulogovani user u userDetails kolekciji pored ovih podataka upise ove podatke i userID , koji verovatno moze da se izvuce iz tokena ? ili kako god da je najbolje da bih posle na osnovu pretrage ovih parametara mogao da nadjem usera koji ima ove podatke

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle style={{ color: brand }}>PRONADJI AVANKARIJA PREKO TABLICA</PageTitle>

                    <Formik
                        initialValues={{
                            city: "",
                            currentPlace: "",
                            pol: "Odaberi Pol",
                            kosa: "Odaberi Boju Kose",
                            oci: "Odaberi Boju ociju",
                            obuca: "Odaberi Obucu",
                            gornjideo: "Odaberi Gornji Deo",
                            donjideo: "Odaberi Donji Deo"
                        }}
                        // onSubmit={(values, { setSubmitting, setFieldValue }) => {
                        onSubmit={(values, { setSubmitting }) => {

                            if (values.city == '' || values.currentPlace == '') {
                                handleMesage('Grad i Mesto su obavezni parametri!', 'FAILED');
                                // setDisabled(true)
                                setSubmitting(false);
                            } else {
                                // handleUpdateUser(values, setSubmitting, setFieldValue);
                                handleUpdateUser(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue }) => (
                            <StyledFormArea>

                                <StyledTextInputWithImage>
                                    <StyledImage source={bg} />
                                    <StyledTableInputSocial
                                        placeholder="Npr BG123CD"
                                        placeholderTextColor={darkLight}
                                        onChangeText={(text) => setTable(text)}
                                    />
                                </StyledTextInputWithImage>

                                <StyledButtonTable onPress={() => updateTable()} style={{ marginBottom: 20, backgroundColor: search }}>
                                    {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                    <ButtonText>TRAZI</ButtonText>
                                </StyledButtonTable>

                                {messageFor === "table" &&
                                    <MsgBox type={messageType}>
                                        <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                                    </MsgBox>
                                }
                                {/* SEPARATOR BETWEEN LOGIN AND REGISTER */}
                                <Line />
                                <PageTitle style={{ color: brand }}>PRONADJI AVANKARIJA PO IZGLEDU</PageTitle>

                                {/* CITY */}
                                <MyTextInput
                                    style={{ fontFamily: CustomFont }}
                                    label="Current City"
                                    icon="location-city"
                                    placeholder="City *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('city')}
                                    onBlur={handleBlur('city')}
                                    value={values.city}
                                />
                                {/* PLACE */}
                                <MyTextInput
                                    style={{ fontFamily: CustomFont }}
                                    label="Current Place"
                                    icon="location-on"
                                    placeholder="Current Place *"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('currentPlace')}
                                    onBlur={handleBlur('currentPlace')}
                                    value={values.currentPlace}
                                />
                                {/* SEX */}
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Pol", "Muski", "Zenski"]}
                                    labelOptions="Pol"
                                    value={values.pol}
                                    // value={values.pol === "Odaberi Pol" ? "" : values.pol}
                                    label="Pol"
                                // values={values}
                                />
                                {/* HAIR */}
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Boju Kose", "Braon", "Crna", "Plava", "Crvena"]}
                                    labelOptions="Kosa"
                                    value={values.kosa}
                                    // value={values.kosa === "Odaberi Kosu" ? "" : values.kosa}
                                    // values={values}
                                    label="Kosa"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Boju Ociju", "Plave", "Zelene", "Braon", "Crne"]}
                                    labelOptions="Oci"
                                    value={values.oci}
                                    // value={values.oci === "Odaberi Oci" ? "" : values.oci}
                                    // values={values}
                                    label="Oci"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Obucu", "Patike", "Cipele", "Cizme", "Sandale", "Papuce", "Baletanke",]}
                                    labelOptions="Obuca"
                                    value={values.obuca}
                                    // value={values.obuca === "Odaberi Obucu" ? "" : values.obuca}
                                    // values={values}
                                    label="Obuca"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Gornji Deo", "Majica", "Dukserica", "Trenerka", "Dzemper", "Rolka", "Suskavac", "Jakna", "Kaput"]}
                                    labelOptions="gornjideo"
                                    value={values.gornjideo}
                                    // value={values.gornjideo === "Odaberi Gornji Deo" ? "" : values.gornjideo}
                                    // values={values}
                                    label="Gornji Deo"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Donji Deo", "Sorc", "Trenerka", "Farmerke", "Pantalone", "Haljina", "Suknja",]}
                                    labelOptions="donjideo"
                                    value={values.donjideo}
                                    // value={values.donjideo === "Odaberi Donji Deo" ? "" : values.donjideo}
                                    // values={values}
                                    label="Donji Deo"
                                />

                                {/* <MsgBox type={messageType}>{message}</MsgBox> */}

                                {/* SUBMIT BUTTON */}
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit} style={{ backgroundColor: search, marginTop: 21 }}>
                                        {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                        <ButtonText>TRAZI</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}

                                <MsgBox type={messageType}>
                                    <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                                </MsgBox>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

//INPUT COMPONENT
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <MaterialIcons name={icon} size={30} color={search} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

//SELECT COMPONENT
const MySelectPicker = ({ valueOptions, labelOptions, value, label }) => {
    const { setFieldValue } = useFormikContext();
    return (
        <View>
            <StyledPickerLabel>{label}</StyledPickerLabel>
            <SyledSelectPicker>
                <Picker
                    style={{
                        backgroundColor: search,
                        color: "white",
                        width: "100%",
                        height: 60,
                        marginTop: -10,
                        marginLeft: -55,
                    }}
                    selectedValue={value}
                    onValueChange={(selectedValue) =>
                        setFieldValue(labelOptions.toLowerCase(), selectedValue)
                    }
                >
                    {valueOptions.map((val, index) => (
                        <Picker.Item value={val} label={val} key={index} />
                    ))}
                </Picker>
            </SyledSelectPicker>
        </View>
    );
};


export default UserProfile

const styles = StyleSheet.create({})