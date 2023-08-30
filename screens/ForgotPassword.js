import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import axios from 'axios';
import { validateEmail } from '../assets/utills/MailValidator';


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
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  MsgBox,
  MsgBox2,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from '../components/styles';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// Destructured colors from 1st prop Colors from style
const { brand, darkLight, primary } = Colors;

// Keyboard Avoiding view
// import * as Google from 'expo-google-app-auth';
const ForgotPassword = ({ navigation }) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
 
  const handleResetPassword = async (credentials, setSubmitting) => {
    // setSubmitting(true);
    // handleMesage('');
    // const url = 'http://192.168.0.13:4000/api/users/login';
    //   //  POVEZI TELEFON NA WIFI ISTI KAO I KOMP !!!!!!!
    // try {
    //   const response = await axios.post(url, credentials);
    //   if (response.status === 200) {
    //     console.log('Login successfully');
    //     const user = await response;
    //     const token = user.data.token
    //     console.log('ovo je user iz logina =============>', user.data);
    //     setMyToken(token)

    //     try {
    //       await AsyncStorage.setItem('@token', token);
    //       await AsyncStorage.setItem('@user', JSON.stringify(user))
    //     } catch (asyncStorageError) {
    //       console.log("ERROR SAVING TOKEN TO ASYNC STORAHE", asyncStorageError)
    //     }
    //   }
    //   navigation.navigate('Welcome', { ...response.data });
      navigation.navigate('Login');

    
    //   setSubmitting(false);
    //   return response.data;
    // } catch (error) {
    //   const message =
    //     (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    //   setSubmitting(false);
    //   handleMesage(message);
    // }
  };



  const handleMesage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const handleMesage2 = (message, type = 'SUCCESS') => {
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
            initialValues={{ email: ''}}
            onSubmit={(values, { setSubmitting }) => {

              if (values.email == '') {
                handleMesage('Please enter your email');
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                return handleMesage('Please enter a valid email');
              } else {
                setTimeout(()=> {
                    handleResetPassword(values, setSubmitting);
                },3000)
                  return handleMesage2('CHECK YOUR EMAIL !!!');
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
      
                {/* THREE DOTS  */}
                {messageType === 'SUCCESS' ? <MsgBox2 type={messageType}>{message}</MsgBox2> : <MsgBox type={messageType}>{message}</MsgBox>}
                
               
                {/* SEPARATOR BETWEEN LOGIN AND REGISTER */}
                <Line />


                {/* LOGIN BUTTON */}
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Reset Password</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

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
const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default ForgotPassword;
