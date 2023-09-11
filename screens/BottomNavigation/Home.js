import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Platform, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_USER, SET_USER, selectUser, LOGOUT_USER } from '../../redux/features/auth/authSlice';
import { CommonActions } from '@react-navigation/native';
import {
    Colors,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
} from '../../components/styles';
import { AntDesign } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

const { brand, darkLight, primary } = Colors;

const Home = ({ navigation, route }) => {
    const [backPressCount, setBackPressCount] = useState(0);
    const [loggedUser, setLoggedUser] = useState(route.params)
    // const user = useSelector(selectUser)
    const user = route.params
    // const KURCINA = useSelector(selectUser)

    const { name, email, picture, photo } = loggedUser
    const dispatch = useDispatch()
    // const avatarSource = photo ? { uri: photo } : picture ? { uri: picture } : { uri: 'https://i.ibb.co/4pDNDk1/avatar.png' }

    const avatarSource = { uri: photo || picture || 'https://i.ibb.co/4pDNDk1/avatar.png' };

    // console.log("USER IZ hOME", user)

    // console.log("sssssssssssssssssssssssssssssssssssssssss", user)

    async function clearAsyncStorage() {
        try {
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }

    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Možete promeniti na 'Videos' ako želite odabrati video
            allowsEditing: true,
            aspect: [4, 3], // Omjer širine i visine za uređivanje
            quality: 1, // Kvalitet slike (0 - 1)
        });

        if (!result.cancelled) {
            // Ovde možete obraditi odabranu sliku ili je postaviti u state
            console.log(result);
        }
    };


    const logoutUser = async () => {
        // await AsyncStorage.removeItem('@token');
        // await AsyncStorage.removeItem('@user');
        await dispatch(LOGOUT_USER())
        clearAsyncStorage();
        console.log("izlogovaaaaaaaaaaaaaaaaaaaaan")
        console.log("------------------------------")
        // await navigation.navigate('Login')

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        )
    }
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


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const userString = await AsyncStorage.getItem('@user');
    //             if (userString) {
    //                 const user = JSON.parse(userString);
    //             }
    //         } catch (error) {
    //             console.error('Error loading user from AsyncStorage:', error);
    //         }
    //     };

    //     fetchUser();
    // }, []);


    return (
        <>
            {/* <StatusBar style="dark" /> */}
            <WelcomeImage
                resizeMode="cover"
                source={avatarSource}
            // style={{ width: "100%", height: '30%', objectFit: 'cover', zIndex: 9999, }}


            />

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 330,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 20,
                    padding: 10,
                    margin: 10,
                }}
                onPress={openImagePicker}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>

            <WelcomeContainer>
                <PageTitle welcome={true}>WELCOME TO AVANKARI</PageTitle>
                <SubTitle welcome={true}>{name || 'Nikola Petrovic'}</SubTitle>
                <SubTitle welcome={true}>{email || 'pepy90aa@gmail.com'}</SubTitle>

                <StyledFormArea>
                    {/* SEPARATOR */}
                    <Line />

                    {/* LOGOUT BUTTON */}
                    <StyledButton onPress={logoutUser}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>
            </WelcomeContainer>
        </>

    )
}

export default Home

const styles = StyleSheet.create({})