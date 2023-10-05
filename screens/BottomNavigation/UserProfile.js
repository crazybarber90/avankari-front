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
    const translation = useSelector((state) => state.translation.messages);

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
                const lowerCaseValue = obj[key].toLowerCase();
                if (!(lowerCaseValue === "odaberi" || lowerCaseValue.startsWith("odaberi")) &&
                    !(lowerCaseValue === "select" || lowerCaseValue.startsWith("select"))) {
                    filtered[key] = lowerCaseValue;
                }
            }
            return filtered;
        };

        const filteredCredentials = filterValues(credentials);
        try {
            const token = await AsyncStorage.getItem("@token");

            if (!token) {
                handleMesage(notAvailableToken[1]);
                setSubmitting(false);
                return;
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            // return console.log("KREDENCIALIII", filteredCredentials)

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
            <StyledContainer style={{ marginBottom: 75 }}>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle style={{ color: brand }}> <Text style={{ fontSize: 35, color: "black" }}>{translation.firstLetter[1]}</Text>{translation.restLetters[1]} <Text style={{ fontSize: 35, color: "black" }}>A</Text>VANKARI</PageTitle>
                    <PageTitleSmaller style={{ color: "black" }}>{translation.beAvailable[1]}</PageTitleSmaller>

                    <Formik
                        initialValues={{
                            city: "",
                            currentPlace: "",
                            // pol: "Odaberi Pol",
                            pol: translation.gender[1],
                            // kosa: "Odaberi Boju Kose",
                            kosa: translation.hair[1],
                            // oci: "Odaberi Boju očiju",
                            oci: translation.eyes[1],
                            // obuca: "Odaberi Obuću",
                            obuca: translation.shoes[1],
                            // gornjideo: "Odaberi Gornji Deo",
                            gornjideo: translation.upperWardrobe[1],
                            // donjideo: "Odaberi Donji Deo"
                            donjideo: translation.lowerWardrobe[1]
                        }}
                        // onSubmit={(values, { setSubmitting, setFieldValue }) => {
                        onSubmit={(values, { setSubmitting }) => {

                            if (values.city == '' || values.currentPlace == '') {
                                handleMesage(translation.cityAndPlaceAreMandatory[1]);
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
                                    label={translation.city[1]}
                                    icon="location-city"
                                    placeholder={`${translation.eG[1]} Beograd`}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('city')}
                                    onBlur={handleBlur('city')}
                                    value={values.city}
                                />
                                {/* PLACE */}
                                <MyTextInput
                                    style={{ fontFamily: CustomFont, marginBottom: 25 }}
                                    label={translation.currentPlace[1]}
                                    icon="location-on"
                                    placeholder={`${translation.eG[1]} Caffe Centar`}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('currentPlace')}
                                    onBlur={handleBlur('currentPlace')}
                                    value={values.currentPlace}
                                />
                                {/* SEX */}
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Pol", "Muški", "Ženski"]}
                                    valueOptions={[translation.gender[1], translation.gender[2], translation.gender[3]]}
                                    labelOptions="Pol"
                                    value={values.pol}
                                    // label="Pol"
                                    label={translation.genderLabel[1]}
                                    fontFamily={CustomFont}
                                // values={values}
                                />
                                {/* HAIR */}
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Boju Kose", "Braon", "Crna", "Plava", "Crvena"]}
                                    valueOptions={[translation.hair[1], translation.hair[2], translation.hair[3], translation.hair[4], translation.hair[5]]}
                                    labelOptions="Kosa"
                                    value={values.kosa}
                                    // label="Boja Kose"
                                    label={translation.hairLabel[1]}
                                // values={values}
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Boju Očiju", "Plave", "Zelene", "Braon", "Crne"]}
                                    valueOptions={[translation.eyes[1], translation.eyes[2], translation.eyes[3], translation.eyes[4], translation.eyes[5]]}

                                    labelOptions="Oci"
                                    value={values.oci}
                                    // label="Oči"
                                    label={translation.eyesLabel[1]}
                                // values={values}
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Obuću", "Patike", "Cipele", "Čizme", "Sandale", "Papuče", "Baletanke",]}
                                    valueOptions={[translation.shoes[1], translation.shoes[2], translation.shoes[3], translation.shoes[4], translation.shoes[5], translation.shoes[6], translation.shoes[7]]}
                                    labelOptions="Obuca"
                                    value={values.obuca}
                                    // label="Obuća"
                                    label={translation.shoesLabel[1]}
                                // values={values}

                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Gornji Deo", "Majica", "Dukserica", "Trenerka", "Dzemper", "Rolka", "Šuškavac", "Jakna", "Kaput"]}
                                    valueOptions={[translation.upperWardrobe[1], translation.upperWardrobe[2], translation.upperWardrobe[3], translation.upperWardrobe[4], translation.upperWardrobe[5], translation.upperWardrobe[6], translation.upperWardrobe[7], translation.upperWardrobe[8], translation.upperWardrobe[9]]}
                                    labelOptions="gornjideo"
                                    value={values.gornjideo}
                                    // label="Gornji Deo"
                                    label={translation.upperWardrobeLabel[1]}
                                // values={values}

                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Donji Deo", "Šorc", "Trenerka", "Farmerke", "Pantalone", "Haljina", "Suknja",]}
                                    valueOptions={[translation.lowerWardrobe[1], translation.lowerWardrobe[2], translation.lowerWardrobe[3], translation.lowerWardrobe[4], translation.lowerWardrobe[5], translation.lowerWardrobe[6], translation.lowerWardrobe[7]]}
                                    labelOptions="donjideo"
                                    value={values.donjideo}
                                    // label="Donji Deo"
                                    label={translation.lowerWardrobeLabel[1]}
                                // values={values}
                                />

                                {/* THREE DOTS  */}

                                {/* SUBMIT BUTTON */}
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit} style={{ marginTop: 20 }}>
                                        {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                        <ButtonText>{translation.save[1]}</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true} style={{ marginTop: 20 }}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}

                                {/* <MsgBox type={messageType}>{message}</MsgBox> */}

                                <MsgBox type={messageType} style={{ marginBottom: 15 }}>
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