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
    StyledContainerHome,
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    MsgBox,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    Line,
    LeftIcon,
    WelcomeContainer,
    WelcomeImage,
    LogoutButton,
    StyledTextInputSocial,
    StyledFormAreaSocial,
    LeftIconSocial,
    ExtraText,
    StyledTableInputSocial,
    StyledImage,
    StyledTextInputWithImage,
    ProfileText,
    ProfileTextContainer,
    StyledButtonTable
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


const { brand, darkLight, primary, tertiary } = Colors;

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


    const updateTable = async () => {
        // return console.log("TABLE ", table)
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
            return response.data;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setSubmitting(false);
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
                <View style={{ position: "absolute", top: 50, right: 20, boxShadow: "1px 1px 1px black", backgroundColor: "black", padding: 2, opacity: 0.7 }}>
                    <Ionicons name="ios-power-sharp" size={40} color={brand} onPress={logoutUser} />
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
                                                    <ExtraText style={{ marginHorizontal: 10, backgroundColor: brand, padding: 7, color: "white", borderRadius: 8 }}>Set Your Social Networks Visible</ExtraText>
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
                                                        <StyledButton onPress={handleSubmit} style={{ marginBottom: 20 }}>
                                                            {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                                            <ButtonText>AZURIRAJ MREZE</ButtonText>
                                                        </StyledButton>
                                                    )}

                                                    {isSubmitting && (
                                                        <StyledButton disabled={true}>
                                                            <ActivityIndicator size="large" color={primary} />
                                                        </StyledButton>
                                                    )}

                                                    {messageFor === "socials" &&
                                                        <MsgBox type={messageType} style={{ marginBottom: 10 }} >
                                                            <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                                                        </MsgBox>
                                                    }


                                                    <StyledTextInputWithImage>
                                                        <StyledImage source={bg} />
                                                        <StyledTableInputSocial
                                                            placeholder="Npr BG123CD"
                                                            placeholderTextColor={darkLight}
                                                            onChangeText={(text) => setTable(text)}

                                                        />
                                                    </StyledTextInputWithImage>
                                                    {!isSubmitting && (
                                                        <StyledButtonTable onPress={updateTable} style={{ marginBottom: 30 }}>
                                                            {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                                                            <ButtonText>AZURIRAJ TABLICU</ButtonText>
                                                        </StyledButtonTable>
                                                    )}
                                                    {messageFor === "table" &&
                                                        <MsgBox type={messageType} style={{ marginTop: -30, marginBottom: 20 }}>
                                                            <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
                                                        </MsgBox>
                                                    }
                                                </>
                                            )}
                                            {/* <Line /> */}

                                            <ProfileTextContainer>
                                                <ProfileText>Tvoj Facebookj profil {'\n'}<Text style={{ color: 'red', fontSize: 15 }}>{currentUser.facebookUrl}</Text></ProfileText>
                                                <ProfileText>Tvoj Instagram profil  {'\n'} <Text style={{ color: 'red', fontSize: 15 }}>{currentUser.instagramUrl}</Text></ProfileText>
                                                <ProfileText>Tvoj Broj Telefona  {'\n'}<Text style={{ color: 'red', fontSize: 15 }}>{currentUser.phoneNumber}</Text></ProfileText>
                                                <ProfileText>Tvoja Tablica  {'\n'}<Text style={{ color: 'red', fontSize: 15 }}>{currentUser.table}</Text></ProfileText>
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
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIconSocial>
                <Entypo name={icon} size={25} color={brand} />
            </LeftIconSocial>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInputSocial {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Home

const styles = StyleSheet.create({})