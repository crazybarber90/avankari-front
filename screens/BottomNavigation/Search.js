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
    const translation = useSelector((state) => state.translation.messages);

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

    const handleSearchUser = async (credentials, setSubmitting) => {

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
                navigation.navigate('SearchList', { responseData: response.data.users });
            }

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
    const searchByTable = async () => {
        //ovde se salje i response, trebao bi da bude niz usera
        // navigation.navigate('SearchList');
        const cleanedTable = table.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
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

    //ovo je objekat koji saljem na backend,zelim da ovaj ulogovani user u userDetails kolekciji pored ovih podataka upise ove podatke i userID , koji verovatno moze da se izvuce iz tokena ? ili kako god da je najbolje da bih posle na osnovu pretrage ovih parametara mogao da nadjem usera koji ima ove podatke

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={{ marginBottom: 75 }} >
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle style={{ color: search }}>{translation.findAvankariViaTable[1]}</PageTitle>

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
                                // handleSearchUser(values, setSubmitting, setFieldValue);
                                handleSearchUser(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue }) => (
                            <StyledFormArea>

                                <StyledTextInputWithImage>
                                    <StyledImage source={bg} />
                                    <StyledTableInputSocial
                                        // placeholder="Npr BG123CD"
                                        placeholder={translation.egTable[1]}
                                        placeholderTextColor={darkLight}
                                        onChangeText={(text) => setTable(text)}
                                    />
                                </StyledTextInputWithImage>

                                <StyledButtonTable onPress={() => searchByTable()} style={{ marginBottom: 20, backgroundColor: search }}>
                                    {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                    <ButtonText>{translation.search[1]}</ButtonText>
                                </StyledButtonTable>

                                {messageFor === "table" &&
                                    <MsgBox type={messageType}>
                                        <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                                    </MsgBox>
                                }
                                {/* SEPARATOR BETWEEN LOGIN AND REGISTER */}
                                <Line />
                                <PageTitle style={{ color: search }}>{translation.findAvankariViaAppearance[1]}</PageTitle>

                                {/* CITY */}
                                <MyTextInput
                                    style={{ fontFamily: CustomFont }}
                                    // label="Grad *"
                                    label={translation.city[1]}
                                    icon="location-city"
                                    // placeholder="npr.  Beograd"
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
                                    // value={values.pol === "Odaberi Pol" ? "" : values.pol}
                                    // label="Pol"
                                    label={translation.genderLabel[1]}
                                // values={values}
                                />
                                {/* HAIR */}
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Boju Kose", "Braon", "Crna", "Plava", "Crvena"]}
                                    valueOptions={[translation.hair[1], translation.hair[2], translation.hair[3], translation.hair[4], translation.hair[5]]}
                                    labelOptions="Kosa"
                                    value={values.kosa}
                                    // value={values.kosa === "Odaberi Kosu" ? "" : values.kosa}
                                    // values={values}
                                    // label="Boja Kose"
                                    label={translation.hairLabel[1]}
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Boju Očiju", "Plave", "Zelene", "Braon", "Crne"]}
                                    valueOptions={[translation.eyes[1], translation.eyes[2], translation.eyes[3], translation.eyes[4], translation.eyes[5]]}
                                    labelOptions="Oci"
                                    value={values.oci}
                                    // value={values.oci === "Odaberi Oci" ? "" : values.oci}
                                    // values={values}
                                    // label="Oči"
                                    label={translation.eyesLabel[1]}
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Obuću", "Patike", "Cipele", "Čizme", "Sandale", "Papuče", "Baletanke",]}
                                    valueOptions={[translation.shoes[1], translation.shoes[2], translation.shoes[3], translation.shoes[4], translation.shoes[5], translation.shoes[6], translation.shoes[7]]}
                                    labelOptions="Obuca"
                                    value={values.obuca}
                                    // value={values.obuca === "Odaberi Obucu" ? "" : values.obuca}
                                    // values={values}
                                    // label="Obuća"
                                    label={translation.shoesLabel[1]}
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Gornji Deo", "Majica", "Dukserica", "Trenerka", "Dzemper", "Rolka", "Šuškavac", "Jakna", "Kaput"]}
                                    valueOptions={[translation.upperWardrobe[1], translation.upperWardrobe[2], translation.upperWardrobe[3], translation.upperWardrobe[4], translation.upperWardrobe[5], translation.upperWardrobe[6], translation.upperWardrobe[7], translation.upperWardrobe[8], translation.upperWardrobe[9]]}
                                    labelOptions="gornjideo"
                                    value={values.gornjideo}
                                    // value={values.gornjideo === "Odaberi Gornji Deo" ? "" : values.gornjideo}
                                    // values={values}
                                    // label="Gornji Deo"
                                    label={translation.upperWardrobeLabel[1]}
                                />
                                <MySelectPicker
                                    setFieldValue={setFieldValue}
                                    // valueOptions={["Odaberi Donji Deo", "Šorc", "Trenerka", "Farmerke", "Pantalone", "Haljina", "Suknja",]}
                                    valueOptions={[translation.lowerWardrobe[1], translation.lowerWardrobe[2], translation.lowerWardrobe[3], translation.lowerWardrobe[4], translation.lowerWardrobe[5], translation.lowerWardrobe[6], translation.lowerWardrobe[7]]}
                                    labelOptions="donjideo"
                                    value={values.donjideo}
                                    // value={values.donjideo === "Odaberi Donji Deo" ? "" : values.donjideo}
                                    // values={values}
                                    // label="Donji Deo"
                                    label={translation.lowerWardrobeLabel[1]}
                                />

                                {/* <MsgBox type={messageType}>{message}</MsgBox> */}

                                {/* SUBMIT BUTTON */}
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit} style={{ backgroundColor: search, marginTop: 21 }}>
                                        {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                        <ButtonText>{translation.search[1]}</ButtonText>
                                    </StyledButton>
                                )}

                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}

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