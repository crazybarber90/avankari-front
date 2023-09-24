import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octicons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';
import { BackHandler } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';
import { SET_USER, selectUser, LOGOUT_USER } from '../../redux/features/auth/authSlice';

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
    SyledSelectPicker,
    StyledPickerLabel,
    PageTitleSmaller,
} from '../../components/styles';


// const token = AsyncStorage.getItem("@token");
// const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json', // Postavite tip sadržaja ako je potrebno
// };

import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
const { brand, darkLight, primary } = Colors;
const UserProfile = () => {

    const [messageType, setMessageType] = useState();
    const [message, setMessage] = useState();
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

    const handleUpdateUser = async (credentials, setSubmitting) => {

        // DA FILTRIRA SVE PROPERTIJE KOJI POCINJU SA ODABERI i da ih ne upisuje u bazu
        setSubmitting(false);

        // const filterValues = (obj) => {
        //     const filtered = {};
        //     for (const key in obj) {
        //         if (!obj[key].startsWith(`Odaberi`)) {
        //             filtered[key.toLowerCase()] = obj[key];
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
        // return console.log('filtered', filteredCredentials)
        try {
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

            const url = 'http://192.168.0.13:4000/api/users/update-user';
            const response = await axios.post(url, filteredCredentials, { headers });

            if (response.status === 200) {
                console.log('Update successfully');
                const userDetails = await response;
                console.log('ovo je user iz logina =============>', userDetails.data);
                handleMesage(userDetails.data.message, 'SUCCESS');
            }
            // navigation.navigate('Home', { ...response.data });
            // navigation.navigate('Home');

            setSubmitting(false);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setSubmitting(false);
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
                    <PageTitle style={{ color: brand, marginTop: 10 }}>POSTANI AVANKARI</PageTitle>
                    <PageTitleSmaller style={{ color: brand }}>BUDI DOSTUPAN</PageTitleSmaller>

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
                                handleMesage('Please fill all the fields');
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
                                    label="Pol"
                                    fontFamily={CustomFont}
                                // values={values}
                                />
                                {/* HAIR */}
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Boju Kose", "Braon", "Crna", "Plava", "Crvena"]}
                                    labelOptions="Kosa"
                                    value={values.kosa}
                                    // values={values}
                                    label="Kosa"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Boju Ociju", "Plave", "Zelene", "Braon", "Crne"]}
                                    labelOptions="Oci"
                                    value={values.oci}
                                    // values={values}
                                    label="Oci"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Obucu", "Patike", "Cipele", "Cizme", "Sandale", "Papuce", "Baletanke",]}
                                    labelOptions="Obuca"
                                    value={values.obuca}
                                    // values={values}
                                    label="Obuca"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Gornji Deo", "Majica", "Dukserica", "Trenerka", "Dzemper", "Rolka", "Suskavac", "Jakna", "Kaput"]}
                                    labelOptions="gornjideo"
                                    value={values.gornjideo}
                                    // values={values}
                                    label="Gornji Deo"
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Donji Deo", "Sorc", "Trenerka", "Farmerke", "Pantalone", "Haljina", "Suknja",]}
                                    labelOptions="donjideo"
                                    value={values.donjideo}
                                    // values={values}
                                    label="Donji Deo"
                                />

                                {/* THREE DOTS  */}

                                {/* SUBMIT BUTTON */}
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit} style={{ marginTop: 20 }}>
                                        {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                        <ButtonText>UPDATE</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true} style={{ marginTop: 20 }}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}

                                {/* <MsgBox type={messageType}>{message}</MsgBox> */}

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
                <MaterialIcons name={icon} size={30} color={brand} />
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

const MySelectPicker = ({ valueOptions, labelOptions, value, label, fontFamily }) => {
    const { setFieldValue } = useFormikContext();
    // console.log("VALUE OPTIONS", valueOptions);
    // console.log("VALUE OPTIONS", value);
    return (
        <View>
            <StyledPickerLabel>{label}</StyledPickerLabel>
            <SyledSelectPicker>
                <Picker
                    style={{
                        backgroundColor: brand,

                        color: "white",
                        width: "100%",
                        height: 60,
                        marginTop: -10,
                        marginLeft: -55,
                    }}
                    itemStyle={{ fontFamily: fontFamily, overflow: 'hidden', borderRadius: 20, }}
                    selectedValue={value}
                    onValueChange={(selectedValue) =>
                        setFieldValue(labelOptions.toLowerCase(), selectedValue)
                    }
                >
                    {valueOptions.map((val, index) => (
                        <Picker.Item style={{ fontFamily: fontFamily }} value={val} label={val} key={index} />
                    ))}
                </Picker>
            </SyledSelectPicker>
        </View>
    );
};


export default UserProfile

const styles = StyleSheet.create({})