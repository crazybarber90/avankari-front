import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { Formik } from 'formik';
import { StatusBar } from 'expo-status-bar';
import { BackHandler } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFormikContext } from 'formik';

import {
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
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    SyledSelectPicker,
    StyledPickerLabel
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

    const handleMesage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };


    // console.log("TOKEN IZ USER DETAILS", token)
    const handleUpdateUser = async (credentials, setSubmitting) => {

        // setSubmitting(true);
        // DA FILTRIRA SVE PROPERTIJE KOJI POCINJU SA ODABERI i da ih ne upisuje u bazu
        // const filterValues = (obj) => {
        //     const filtered = {};
        //     for (const key in obj) {
        //         if (obj[key] !== `Odaberi ${key}`) {
        //             filtered[key] = obj[key];
        //         }
        //     }
        //     return filtered;
        // };

        // const filteredCredentials = filterValues(credentials);

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
            const response = await axios.post(url, credentials, { headers });

            if (response.status === 200) {
                console.log('Update successfully');
                const userDetails = await response;
                console.log('ovo je user iz logina =============>', userDetails.data);
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

    //ovo je objekat koji saljem na backend,zelim da ovaj ulogovani user u userDetails kolekciji pored ovih podataka upise ove podatke i userID , koji verovatno moze da se izvuce iz tokena ? ili kako god da je najbolje da bih posle na osnovu pretrage ovih parametara mogao da nadjem usera koji ima ove podatke

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>ABDEJTUJ SE NA AVANKARI</PageTitle>

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
                                    label="Current City"
                                    icon="lock"
                                    placeholder="City"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('city')}
                                    onBlur={handleBlur('city')}
                                    value={values.city}
                                />
                                {/* PLACE */}
                                <MyTextInput
                                    label="Current Place"
                                    icon="lock"
                                    placeholder="Current Place"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('currentPlace')}
                                    onBlur={handleBlur('currentPlace')}
                                    value={values.currentPlace}
                                />
                                {/* SEX */}
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    valueOptions={["Odaberi Pol", "Muski", "zenski", "aaaa", "hahahhah"]}
                                    labelOptions="Pol"
                                    value={values.pol}
                                    label="Pol"
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
                                <MsgBox type={messageType}>{message}</MsgBox>

                                {/* SUBMIT BUTTON */}
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                        <ButtonText>UPDATE</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}
                                {/* SEPARATOR BETWEEN LOGIN AND REGISTER */}
                                <Line />
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
                <Octicons name={icon} size={30} color={brand} />
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

//INPUT COMPONENT
// const MySelectPicker = ({ valueOptions, labelOptions, value, setFieldValue }) => {
//     const { values } = useFormikContext();
//     console.log("VALUE OPTIONS", valueOptions)
//     return (
//         <View>
//             <StyledPickerLabel>{labelOptions}</StyledPickerLabel>
//             <SyledSelectPicker>
//                 <Picker style={{
//                     backgroundColor: brand,
//                     color: "white",
//                     width: "100%",
//                     height: 40,
//                     marginTop: -10,
//                     marginLeft: -55,
//                 }}
//                     selectedValue={value}
//                     onValueChange={(selectedValue) => setFieldValue(labelOptions.toLowerCase(), selectedValue)}
//                 >
//                     {valueOptions.map((val, index) => (
//                         <Picker.Item value={val} label={val} key={index} />
//                     ))}
//                 </Picker>
//             </SyledSelectPicker>
//         </View>
//     );
// };

const MySelectPicker = ({ valueOptions, labelOptions, value, label }) => {
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
                        height: 40,
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