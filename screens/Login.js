import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, ActivityIndicator, Platform, Text, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { validateEmail } from '../assets/utills/MailValidator';
import { handleGoogleSignup } from '../assets/utills/handleSignup';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { SET_LANGUAGE } from '../redux/features/translationSlice';
import { CheckBox } from 'react-native-elements';

//formik
import { Formik } from 'formik';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
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
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../components/styles';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { SET_USER } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

// Destructured colors from 1st prop Colors from style
const { brand, darkLight, primary, search, tertiary } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [myToken, setMyToken] = useState(null);
  const dispatch = useDispatch()
  const [currentLang, setCurrentLang] = useState()
  const [isChecked, setIsChecked] = useState(false);
  const [messageForGoole, setMessageForGoogle] = useState();
  const [messageForLogin, setMessageForLogin] = useState();

  const translation = useSelector((state) => state.translation.messages)


  const [backPressCount, setBackPressCount] = useState(0);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '175142944378-g6u6ijon4tem0dmcktb2m1ncjq7t0nes.apps.googleusercontent.com',
    androidClientId: `175142944378-p94dqja9kjhnmdt5oncf7qpvdjoulr1r.apps.googleusercontent.com`,
    iosClientId: `175142944378-5ele4obm50pe6ok3dm5dvoq6etb572jr.apps.googleusercontent.com`,
    scopes: ['openid', 'profile', 'email']
  });


  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  // Token chekc for restore app from background
  // token ? welcome : login
  useEffect(() => {
    // Check token existence and navigate accordingly
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem('@token');
      const user = await AsyncStorage.getItem('@user');
      const parsedUser = JSON.parse(user);
      if (token) {
        if (parsedUser) { // Provera postojanja parsedUser
          if (parsedUser.photo) {
            // rename name of picture to photo
            const newUser = { ...parsedUser, picture: parsedUser.photo };
            delete newUser.picture;
            navigation.replace('Welcome', newUser);
          } else if (parsedUser.data) { // Provera postojanja parsedUser.data
            navigation.replace('Welcome', parsedUser.data);
          }
        }
      }
    };

    checkTokenAndNavigate();
  }, [navigation]);


  // UCITAVANJE ODABRANOG JEZIKA 
  useEffect(() => {
    console.log("UISAOOOO")
    const getSelectedLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          dispatch(SET_LANGUAGE({ locale: selectedLanguage }));
          setCurrentLang(selectedLanguage);
        }
        // else {
        //   dispatch(SET_LANGUAGE({ locale: "srp" }));
        // }
      } catch (error) {
        console.error('Error reading selected language from AsyncStorage:', error);
      }
    };
    getSelectedLanguage();
  }, [dispatch]);

  // Whenever response changed, run this function
  // Response will triger useEffect, useEffect will try to get the user info if "success" , getrUserInfo, save localy to state
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);


  //===================================>>> REMOVING BACK ARROW TO LOGIN PAGE
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null, // This will remove the back arrow
    });
  }, [navigation]);


  //===================================>>> DEVICE'S BACK DOESN'T WORK, IF PRESS X2, EXIT FROM APP
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

  // Preventing triggering handleSignupWithGoogle 2 times//// first in useEffect and second when response changed from useEffect on line 149
  let isSigningUp = false;


  const handleSignInWithGoogle = async () => {
    setMessageForGoogle("googleSignin")
    if (response?.type === 'success' && !isSigningUp) {
      isSigningUp = true;

      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: {
            Authorization: `Bearer ${response.authentication.accessToken}`,
          },
        });

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();

          // Call the handleSignup function to register or login the user with the obtained userInfo
          const signupResponse = await handleGoogleSignup({
            authentication: response.authentication,
            userInfo: {
              email: userInfo.email,
              name: userInfo.name,
              photo: userInfo.picture,
            },
          });

          // OVDE JE signupResponse return funkcije handleGoogleSignup = response usera iz baze
          if (userInfo) {
            await dispatch(SET_USER(signupResponse));
            await navigation.navigate('Welcome', signupResponse);
          }

        } else {
          console.error('...........................................................Error fetching user info:', userInfoResponse.status);
        }

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    } else {
      console.log("NEMA LOGINAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    }
  };

  // // USEEFFECT FOR TRIGGERING HANDLE GOOGLE LOGIN BASED ON RESPONSE
  useEffect(() => {
    // Trigger handleSignInWithGoogle when response changes
    if (response?.type === 'success') {
      handleSignInWithGoogle();
    }
  }, [response]);


  // USEEFFECT FOR GETTING TOKEN FROM ASYNC STORAGE AND BACK USER LOGED IN
  // useEffect(() => {
  //   // Retrieve the token from AsyncStorage
  //   const getToken = async () => {
  //     const token = await AsyncStorage.getItem('@token');
  //     const user = await AsyncStorage.getItem('@user');
  //     if (token) {
  //       if (user) {
  //         const parsedUser = JSON.parse(user)
  //         const data = parsedUser?.data
  //         console.log(" useEffect, useEffect, useEffect, useEffect, useEffect, useEffect,  LOGIN ======== >", data)
  //         await navigation.navigate('Welcome', data);
  //       }
  //       // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     }
  //   };
  //   getToken();
  // }, [navigation]);


  const handleLogin = async (credentials, setSubmitting) => {
    setSubmitting(true);
    handleMesage('');
    setMessageForLogin("loginnn")
    const url = 'http://192.168.0.13:4000/api/users/login';
    //  POVEZI TELEFON NA WIFI ISTI KAO I KOMP !!!!!!!
    try {
      const response = await axios.post(url, credentials);
      if (response.status === 200) {
        console.log('Login successfully');
        const user = await response;
        const token = user.data.token
        console.log('ovo je user iz logina =============>', user.data);
        setMyToken(token)

        try {
          await AsyncStorage.setItem('@token', token);
          await AsyncStorage.setItem('@user', JSON.stringify(user.data))
        } catch (asyncStorageError) {
          console.log("ERROR SAVING TOKEN TO ASYNC STORAHE", asyncStorageError)
        }
      }
      navigation.navigate('Welcome', { ...response.data });

      setSubmitting(false);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      setSubmitting(false);
      try {
        const errorResponse = JSON.parse(message);
        const errorMessage = currentLang === 'en' ? errorResponse.eng : errorResponse.srp;
        await handleMesage(errorMessage);
      } catch (parseError) {
        await handleMesage('Server Error');
      }
    }
  };

  const handleMesage = (message, type = 'FAILED',) => {
    setMessage(message);
    setMessageType(type);

    // timeout da sakrijete poruku nakon 5 sekundi
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  return (
    <KeyboardAvoidingWrapper>
      {/* <StyledContainer> */}
      <>

        {/* CHANGE LANGUAGES FLAGS */}
        <View style={{ position: "absolute", top: 40, right: -30 }}>
          {/* CHANGE LANGUAGE BUTTONS */}
          {currentLang === "en" && <TouchableOpacity
            style={{ color: primary, width: 100, height: 100, textAlign: "left" }}
            onPress={() => {
              dispatch(SET_LANGUAGE({ locale: 'srp' }));
              setCurrentLang('srp')

            }}
          >
            <ImageBackground
              source={require('../assets/img/srbFlag.png')}
              style={{
                width: '55%',
                height: '50%',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: brand, marginTop: 20, textAlign: "left", fontFamily: CustomFont, fontSize: 12 }}>Srb</Text>
            </ImageBackground>
          </TouchableOpacity>}

          {currentLang === "srp" && <TouchableOpacity
            style={{ color: primary, width: 100, height: 100, textAlign: "left" }}
            onPress={() => {
              dispatch(SET_LANGUAGE({ locale: 'en' }));
              setCurrentLang('en')
            }}
          >
            <ImageBackground
              source={require('../assets/img/engFlag.png')}
              style={{
                width: '55%',
                height: '50%',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: brand, marginTop: 20, textAlign: "left", fontFamily: CustomFont, fontSize: 12 }}>Eng</Text>
            </ImageBackground>
          </TouchableOpacity>}
        </View>

        <StatusBar style="dark" />
        <InnerContainer style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
          {/* LOGO ON START SCREEN */}
          <PageLogo resizeMode="contain" source={require('./../assets/img/lik2.png')} />
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {

              if (values.email == '' || values.password == '') {
                handleMesage(translation.loginValidation[1]);
                // setDisabled(true)
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                return handleMesage(translation.loginValidation[2]);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                {/* EMAIL INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label={translation.emailLabel[1]}
                  icon="mail"
                  placeholder="petar@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {/* PASSWORD INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label={translation.loginPasswordLabel[1]}
                  icon="lock"
                  placeholder="* * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                {/* LOGIN BUTTON */}
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>{translation.login[1]}</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <ExtraView>
                  <TextLink onPress={() => navigation.navigate('ForgotPassword')}>
                    <TextLinkContent>{translation.forgotPassword[1]}</TextLinkContent>
                  </TextLink>
                </ExtraView>

                <Line />

                < MsgBox style={{ fontSize: 15 }} type={messageType}>{message}</MsgBox>

                {/*  CHECKBOX FOR TERMS OF USE */}
                <View style={{ marginVertical: 10 }}>
                  <View>
                    <TextLinkContent style={{ textAlign: "center", color: tertiary, borderColor: tertiary, borderWidth: 0.2, padding: 5 }} onPress={() => navigation.navigate("TermsOfConditions")} >{translation.readTermsOfUse[1]}</TextLinkContent>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                      checked={isChecked}
                      onPress={toggleCheckBox}
                      checkedColor={brand}
                    />
                    <TextLinkContent style={{ marginLeft: -15 }}>{translation.iAgreeWithTerms[1]}</TextLinkContent>
                  </View>
                </View>

                {/* GOOGLE SIGNUP BUTTON */}
                <StyledButton google={true} onPress={isChecked ? () => promptAsync({ showInRecents: true }) : () => handleMesage(translation.youMustAgree[1])}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>{translation.signInWithGoogle[1]}</ButtonText>
                </StyledButton>


                {/* DON'T HAVE AN ACCOUNT ALLREADY ?????? */}
                <ExtraView>
                  <ExtraText>{translation.notRegistered[1]}</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent style={{ fontSize: 20 }}>{translation.register[1]}</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </>
      {/* </StyledContainer> */}
    </KeyboardAvoidingWrapper >
  );
};

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

export default Login;