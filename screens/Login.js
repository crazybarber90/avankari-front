import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import axios from 'axios';
import { validateEmail } from '../assets/utills/MailValidator';
import { handleGoogleSignup } from '../assets/utills/handleSignup';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';


//formik
import { Formik } from 'formik';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
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
} from '../components/styles';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { SET_USER } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
// Destructured colors from 1st prop Colors from style
const { brand, darkLight, primary } = Colors;

// Keyboard Avoiding view
// import * as Google from 'expo-google-app-auth';
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [myToken, setMyToken] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch()


  const [backPressCount, setBackPressCount] = useState(0);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '175142944378-g6u6ijon4tem0dmcktb2m1ncjq7t0nes.apps.googleusercontent.com',
    androidClientId: `175142944378-p94dqja9kjhnmdt5oncf7qpvdjoulr1r.apps.googleusercontent.com`,
    iosClientId: `175142944378-5ele4obm50pe6ok3dm5dvoq6etb572jr.apps.googleusercontent.com`,
    scopes: ['openid', 'profile', 'email']
  });


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
    if (response?.type === 'success' && !isSigningUp) {
      isSigningUp = true;
      // await AsyncStorage.removeItem('@token');
      // const user = await AsyncStorage.getItem('@user');
      // const token = await AsyncStorage.getItem('@token');

      console.log("LOGIRANJEEEEEEEEEEEEEEEE IZ HANDLESIGNUP Response type: success");

      try {
        // const idToken = response.authentication.idToken;
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: {
            Authorization: `Bearer ${response.authentication.accessToken}`,
          },
        });

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();

          // console.log("USER INFO IZ GOOGLE SIGINI", userInfo)


          // Call the handleSignup function to register or login the user with the obtained userInfo
          const signupResponse = await handleGoogleSignup({
            authentication: response.authentication,
            userInfo: {
              email: userInfo.email,
              name: userInfo.name,
              photo: userInfo.picture,
            },
          });

          // await console.log("(((((((((((***************signupRESPONSE", signupResponse)

          // Navigate to the Welcome screen or handle it as needed

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
  useEffect(() => {
    // Retrieve the token from AsyncStorage
    const getToken = async () => {
      const token = await AsyncStorage.getItem('@token');
      const user = await AsyncStorage.getItem('@user');
      if (token) {
        if (user) {
          const parsedUser = JSON.parse(user)
          const data = parsedUser?.data
          console.log(" useEffect, useEffect, useEffect, useEffect, useEffect, useEffect,  LOGIN ======== >", data)
          await navigation.navigate('Welcome', data);
        }
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };
    getToken();
  }, [navigation]);


  const handleLogin = async (credentials, setSubmitting) => {
    setSubmitting(true);
    handleMesage('');
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
      handleMesage(message);
    }
  };

  const handleMesage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          {/* LOGO ON START SCREEN */}
          <PageLogo resizeMode="cover" source={require('./../assets/img/ja.jpg')} />
          <PageTitle>Avankari</PageTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {

              if (values.email == '' || values.password == '') {
                handleMesage('Please fill all the fields');
                // setDisabled(true)
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                return handleMesage('Please enter a valid email');
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                {/* EMAIL INPUT */}
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Ener Your Email"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {/* PASSWORD INPUT */}
                <MyTextInput
                  label="Password"
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
                {/* THREE DOTS  */}
                <MsgBox type={messageType}>{message}</MsgBox>

                {/* LOGIN BUTTON */}
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    {/* // <StyledButton disabled={disable || !(values.email && values.password)} onPress={handleSubmit}> */}
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}


                <ExtraView>
                  <TextLink onPress={() => navigation.navigate('ForgotPassword')}>
                    <TextLinkContent>Forgot Password ?</TextLinkContent>
                  </TextLink>
                </ExtraView>

                {/* SEPARATOR BETWEEN LOGIN AND REGISTER */}
                <Line />

                <StyledButton google={true} onPress={() => promptAsync({ showInRecents: true })}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>


                {/* DON'T HAVE AN ACCOUNT ALLREADY ?????? */}
                <ExtraView>
                  <ExtraText>Don't have an account allready?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
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