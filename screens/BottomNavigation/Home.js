import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Platform, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER, selectUser, LOGOUT_USER } from '../../redux/features/auth/authSlice';
import { CommonActions } from '@react-navigation/native';
import { Formik } from 'formik';
import { Octicons, Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';


import {
    Colors,
    InnerContainer,
    MsgBox,
    StyledInputLabel,
    ButtonText,
    WelcomeContainer,
    WelcomeImage,
    StyledTextInputSocial,
    StyledFormAreaSocial,
    LeftIconSocial,
    ExtraText,
    StyledTableInputSocial,
    StyledImage,
    StyledTextInputWithImage,
    ProfileText,
    ProfileTextContainer,
    SocialsValues,
    StyledButtonSocials,
    MsgBoxLeft
} from '../../components/styles';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
// import { ImageManipulator } from 'expo';
// import { ImageManipulator } from 'expo-image-manipulator';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { ScrollView } from 'react-native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import bg from "../../assets/img/bg.png"


const { brand, darkLight, primary, tertiary, red } = Colors;

const Home = ({ navigation, route }) => {

    const [messageType, setMessageType] = useState();
    const [message, setMessage] = useState();
    const [messageFor, setMessageFor] = useState();
    const currentUser = useSelector(selectUser)


    const [backPressCount, setBackPressCount] = useState(0);
    const [loggedUser, setLoggedUser] = useState(route.params)
    const user = route.params

    // IMAGE STATES
    const [image, setImage] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)

    // SOCIAL NETWORKS==========================

    const [changedSocialState, setChangedSocialState] = useState(false);
    const [showInputs, setShowInputs] = useState(false);
    const [table, setTable] = useState('');
    const [loader, setLoader] = useState(false);


    const [userData, setUserData] = useState({
        facebookUrl: '',
        instagramUrl: '',
        phoneNumber: '',
    });

    const [keyboardHeight, setKeyboardHeight] = useState(0);


    // SOCIAL NETWORKS==========================

    const { name, email, picture, photo } = loggedUser
    const dispatch = useDispatch()
    // const avatarSource = photo ? { uri: photo } : picture ? { uri: picture } : { uri: 'https://i.ibb.co/4pDNDk1/avatar.png' }
    // const avatarSource = { uri: photo || picture || 'https://i.ibb.co/4pDNDk1/avatar.png' };
    const avatarSource = image ? { uri: image } : { uri: photo || picture || 'https://i.ibb.co/4pDNDk1/avatar.png' };

    async function clearAsyncStorage() {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }

    const handleMesage = (message, type = 'FAILED',) => {
        setMessage(message);
        setMessageType(type);

        // timeout da sakrijete poruku nakon 5 sekundi
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 5000);
    };

    const logoutUser = async () => {
        // await AsyncStorage.removeItem('@token');
        // await AsyncStorage.removeItem('@user');
        await dispatch(LOGOUT_USER())
        clearAsyncStorage();
        console.log("izlogovaaaaaaaaaaaaaaaaaaaaan")
        console.log("------------------------------")
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        )
    }

    useEffect(() => {
        const fetchUserFromStorage = async () => {
            try {
                const userString = await AsyncStorage.getItem('@user');
                if (userString) {
                    const user = JSON.parse(userString);
                    console.log("UsER IZ storage ", user)
                    // Postavite korisnika u Redux stanje koristeći odgovarajuću Redux akciju
                    dispatch(SET_USER(user));
                }
            } catch (error) {
                console.error('Error loading user from AsyncStorage:', error);
            }
        };

        fetchUserFromStorage();
        console.log("ODRADIO UPIS U REDUX STEJT")
    }, [changedSocialState]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    //=================================== REMOVING BACK ARROW FROM WELCOME PAGE
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null, // This will remove the back arrow
        });
    }, [navigation]);

    //=================================== DEVICE'S BACK DOESN'T WORK, IF PRESS X2, EXIT FROM APP
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // Onemogućite funkcionalnost "back" dugmeta samo ako ste na ekranu za prijavljivanje
            if (navigation.isFocused()) {
                if (backPressCount === 1) {
                    BackHandler.exitApp(); // Izlaz iz aplikacije ako se pritisne dva puta "back" dugme
                    return true;
                }
                setBackPressCount(1);
                setTimeout(() => setBackPressCount(0), 2000); // Resetovanje broja pritisaka nakon 2 sekunde
                return true; // Vratite true da biste rekli sistemu da ste obradili pritisak na "back" dugme
            }
            return false;
        });

        return () => backHandler.remove();
    }, [navigation, backPressCount]);

    // PERMISIJA ZA GALERIJU
    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    console.log("CURENTTTTTTTT USERRRRRRRRRRRRRRRRRRRRR", currentUser);

    //=================================== UPLOAD SLIKE
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            try {
                // STARI NACIN MANJA REZOLUCIJA do 40kb slika
                // const manipResult = await ImageManipulator.manipulateAsync(
                //     result.assets[0].uri,
                //     [{ resize: { width: 800, height: 600 } }], // Postavite željene dimenzije
                //     { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // Postavite kvalitet kompresije
                // );


                // NOV NACIN VECA REZOLUCIJA do 120kb slika
                const selectedImage = result.assets[0];

                // Automatski izračunajte visinu kako biste očuvali proporcije
                const width = 1920; // Željena širina
                const height = (selectedImage.height / selectedImage.width) * width;

                const manipResult = await ImageManipulator.manipulateAsync(
                    selectedImage.uri,
                    [{ resize: { width, height } }],
                    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
                );

                const formData = new FormData();
                formData.append('image', {
                    uri: manipResult.uri,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                });
                setImage(manipResult.uri);

                try {
                    const token = await AsyncStorage.getItem("@token");
                    const user = await AsyncStorage.getItem("@user");

                    if (!token) {
                        handleMesage('Token nije dostupan.');
                        return;
                    }
                    const headers = {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    };

                    const url = 'http://192.168.0.13:4000/api/users/upload-user-photo';

                    const response = await axios.put(url, formData, { headers });
                    const newPhoto = response.data.user.photo;

                    //======================== UPDATE ASYNCSTORAGE SA NOVOM SLIKOM"
                    const currentUserString = await AsyncStorage.getItem('@user');
                    const currentUser = JSON.parse(currentUserString);
                    currentUser.photo = newPhoto;

                    // čuvajnje ažuriranog korisnika u AsyncStorage-u
                    await AsyncStorage.setItem('@user', JSON.stringify(currentUser));

                    // Ažuriranje Redux stanje kako bi se reflektovale promene slike
                    await dispatch(SET_USER(currentUser));

                    if (response.status === 200) {
                        console.log('Update successfully', response.data.user.photo);
                        const userData = await response;
                        setMessageFor("image")

                        handleMesage('IMAGE CHANGED SUCCESSFULLY !', "SUCCESS");
                        await setChangedSocialState(!changedSocialState)
                    }
                    return response.data;
                } catch (error) {
                    const message =
                        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    handleMesage(message);
                }
            } catch (error) {
                console.error('Greška pri obradi slike:', error);
            }
        }
    };


    // useEffect(() => {
    //     console.log("curent is uzeEffectxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", currentUser);
    // }, [changedSocialState]);

    // console.log("STATEsssssssssssssssssssssssssssssssssssssssssssssssssssssssss", changedSocialState)

    const handleUpdateSocials = async (values, setSubmitting) => {
        const { facebookUrl, instagramUrl, phoneNumber } = userData
        if (facebookUrl === "" && instagramUrl === "" && phoneNumber === "") {
            setMessageFor('socials')
            handleMesage("Unesi mreze")
            return setSubmitting(false);
        }
        // return console.log("USER DATA", userData)
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
            const url = 'http://192.168.0.13:4000/api/users/update-socials';
            // return console.log("USERDATAaaaaaaaaaaaaaaaaaaaaaaaaaa", userData)

            const response = await axios.post(url, userData, { headers });

            if (response.status === 200) {
                console.log('Update successfully', response.data);

                //======================== UPDATE ASYNCSTORAGE SA NOVI SOCIALS"
                const newFacebookUrl = response.data.user.facebookUrl;
                const newInstagramUrl = response.data.user.instagramUrl;
                const newPhoneNumber = response.data.user.phoneNumber;

                // Učitavanje trenutnog korisnika iz AsyncStorage-a
                const currentUserString = await AsyncStorage.getItem('@user');
                const currentUser = JSON.parse(currentUserString);

                // Učitavanje trenutnog korisnika iz AsyncStorage-a
                currentUser.facebookUrl = newFacebookUrl;
                currentUser.instagramUrl = newInstagramUrl;
                currentUser.phoneNumber = newPhoneNumber;

                // Ažuriranje nove vrednosti u trenutnom korisniku
                currentUser.facebookUrl = newFacebookUrl;
                currentUser.instagramUrl = newInstagramUrl;
                currentUser.phoneNumber = newPhoneNumber;

                // čuvajte ažuriranog korisnika u AsyncStorage-u
                await AsyncStorage.setItem('@user', JSON.stringify(currentUser));
                //======================== UPDATE ASYNCSTORAGE SA NOVI SOCIALS"


                await dispatch(SET_USER(response.data));

                await setChangedSocialState(!changedSocialState)
                setMessageFor("socials")
                handleMesage('USPESNO AZURIRANO !', "SUCCESS");
                console.log('ovo je log sa backenda =============>', currentUser);
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


    const updateTable = async (setSubmitting) => {
        // return console.log("TABLE ", table)
        setLoader(true);
        if (table === "") {
            setMessageFor('table')
            handleMesage("Unesi tablicu")
            return setLoader(false);
        }
        try {
            const cleanedTable = table.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
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
            const url = 'http://192.168.0.13:4000/api/users/update-table';

            const response = await axios.post(url, { table: cleanedTable }, { headers });
            // return console.log("RESPONSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", table)

            if (response.status === 200) {
                console.log('Update successfully', response.data);
                setLoader(false);
                const newTable = response.data.table;

                // Učitavanje trenutnog korisnika iz AsyncStorage-a
                const currentUserString = await AsyncStorage.getItem('@user');
                const currentUser = JSON.parse(currentUserString);

                console.log("=========================== current string ", currentUser)

                currentUser.table = newTable;

                // Učitavanje trenutnog korisnika iz AsyncStorage-a
                currentUser.table = table;

                // čuvajte ažuriranog korisnika u AsyncStorage-u
                await AsyncStorage.setItem('@user', JSON.stringify(currentUser));
                //======================== UPDATE ASYNCSTORAGE SA NOVI SOCIALS"
                setMessageFor("table")
                handleMesage('USPESNO AZURIRANA TABLICA !', "SUCCESS");
                await dispatch(SET_USER(response.data));

                await setChangedSocialState(!changedSocialState)
            }
            setLoader(false);
            return response.data;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setLoader(false);
            handleMesage(message);
        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <>

                {/* <StatusBar style="dark" /> */}
                {/* <View> */}

                <WelcomeImage
                    resizeMode="cover"
                    source={avatarSource}
                // style={{ width: "100%", height: '30%', objectFit: 'cover', zIndex: 9999, }}
                />
                {messageFor === "image" &&
                    <MsgBox type={messageType} style={{ marginTop: 5 }}>
                        <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                    </MsgBox>
                }
                {/* </View> */}

                {/* ADD IMAGE BUTTON */}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 250 - keyboardHeight / 2.3,
                        // top: 250,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: 20,
                        padding: 10,
                        margin: 10,
                    }}
                    onPress={() => pickImage()}
                >
                    <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
                <View style={{ position: "absolute", top: 50, right: 20, boxShadow: "1px 1px 1px black", padding: 2 }}>
                    <Ionicons name="ios-power-sharp" size={40} color={red} onPress={logoutUser} />
                </View>
                {/* {image && <Image source={{ uri: image }} style={{ flex: 1 / 3 }}></Image>} */}
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView>
                        <WelcomeContainer>
                            {/* <View style={{ position: "absolute", top: -10, right: 20, boxShadow: "1px 1px 1px black", backgroundColor: "black", padding: 2, opacity: 0.7 }}>
                                <Ionicons name="ios-power-sharp" size={40} color={brand} onPress={logoutUser} />
                            </View> */}
                            {/* <KeyboardAvoidingWrapper> */}

                            <InnerContainer>
                                {/* <PageTitle></PageTitle> */}
                                <Formik
                                    initialValues={{
                                        facebookUrl: "",
                                        instagramUrl: "",
                                        phoneNumber: "Odaberi Pol",

                                    }}
                                    // onSubmit={(values, { setSubmitting, setFieldValue }) => {
                                    onSubmit={(values, { setSubmitting }) => {
                                        // handleUpdateUser(values, setSubmitting, setFieldValue);
                                        handleUpdateSocials(values, setSubmitting);

                                    }}
                                >
                                    {({ handleBlur, handleSubmit, isSubmitting }) => (
                                        <StyledFormAreaSocial>
                                            <TouchableOpacity onPress={() => setShowInputs(!showInputs)}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                                    <Octicons name={showInputs ? "triangle-up" : "triangle-down"} size={24} color={brand} />
                                                    <ExtraText style={{ marginHorizontal: 10, backgroundColor: brand, padding: 7, color: "white", fontSize: 16, borderRadius: 8 }}>PODELI SVOJE MREZE</ExtraText>
                                                </View>
                                            </TouchableOpacity>
                                            {/* CITY */}
                                            {showInputs && (
                                                <>
                                                    <MyTextInput
                                                        label="Facebook"
                                                        icon="facebook-with-circle"
                                                        placeholder="Facebook"
                                                        placeholderTextColor={darkLight}
                                                        onChangeText={(text) => setUserData({ ...userData, facebookUrl: text })}
                                                        onBlur={handleBlur('facebook')}
                                                        value={userData.facebook}
                                                    />
                                                    {/* PLACE */}
                                                    <MyTextInput
                                                        label="Instagram"
                                                        icon="instagram-with-circle"
                                                        placeholder="Instagram"
                                                        placeholderTextColor={darkLight}
                                                        onChangeText={(text) => setUserData({ ...userData, instagramUrl: text })}
                                                        onBlur={handleBlur('instagram')}
                                                        value={userData.instagram}
                                                    />
                                                    <MyTextInput
                                                        label="Phone Number"
                                                        icon="phone"
                                                        placeholder="Phone Number"
                                                        placeholderTextColor={darkLight}
                                                        onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })} onBlur={handleBlur('phoneNumber')}
                                                        value={userData.phoneNumber}
                                                    />


                                                    {/* {messageFor === "social" &&
                                                        <MsgBox type={messageType}>{message}</MsgBox>
                                                    } */}

                                                    {/* SUBMIT BUTTON */}
                                                    {!isSubmitting && (
                                                        <StyledButtonSocials onPress={handleSubmit} style={{ marginBottom: 30 }}>
                                                            {/* // <StyledButtonSocials disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                                            <ButtonText>AZURIRAJ MREZE</ButtonText>
                                                        </StyledButtonSocials>
                                                    )}

                                                    {isSubmitting && (
                                                        <StyledButtonSocials style={{ marginBottom: 30 }} disabled={true}>
                                                            <ActivityIndicator size="large" color={primary} />
                                                        </StyledButtonSocials>
                                                    )}

                                                    {messageFor === "socials" &&
                                                        <MsgBoxLeft type={messageType} style={{ marginBottom: 10 }}>
                                                            <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                                                        </MsgBoxLeft>
                                                    }


                                                    <StyledTextInputWithImage>
                                                        <StyledImage source={bg} />
                                                        <StyledTableInputSocial
                                                            placeholder="Npr BG123CD"
                                                            placeholderTextColor={darkLight}
                                                            onChangeText={(text) => setTable(text)}

                                                        />
                                                    </StyledTextInputWithImage>
                                                    {!loader && (
                                                        <StyledButtonSocials onPress={updateTable} style={{ marginBottom: 30 }}>
                                                            <ButtonText>AZURIRAJ TABLICU</ButtonText>
                                                        </StyledButtonSocials>
                                                    )}

                                                    {loader && (
                                                        <StyledButtonSocials style={{ marginBottom: 30 }} disabled={true}>
                                                            <ActivityIndicator size="large" color={primary} />
                                                        </StyledButtonSocials>
                                                    )}
                                                    {messageFor === "table" &&
                                                        <MsgBoxLeft type={messageType}>
                                                            <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                                                        </MsgBoxLeft>
                                                    }
                                                </>
                                            )}
                                            {/* <Line /> */}

                                            <ProfileTextContainer>
                                                <ProfileText>Tvoj Facebook Profil
                                                </ProfileText>
                                                <SocialsValues>{currentUser.facebookUrl}</SocialsValues>
                                                <ProfileText>Tvoj Instagram Profil </ProfileText>
                                                <SocialsValues>{currentUser.instagramUrl}</SocialsValues>
                                                <ProfileText>Tvoj Broj Telefona</ProfileText>
                                                <SocialsValues>{currentUser.phoneNumber}</SocialsValues>
                                                <ProfileText>Tvoja Tablica</ProfileText>
                                                <SocialsValues>{currentUser.table}</SocialsValues>
                                            </ProfileTextContainer>
                                        </StyledFormAreaSocial>
                                    )}
                                </Formik>
                            </InnerContainer>
                            {/* </KeyboardAvoidingWrapper> */}

                        </WelcomeContainer>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </>
        </KeyboardAvoidingView >

    )
}


//INPUT COMPONENT
const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View>
            <LeftIconSocial>
                <Entypo name={icon} size={25} color={brand} />
            </LeftIconSocial>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInputSocial {...props} />
        </View>
    );
};

export default Home

const styles = StyleSheet.create({})