import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { validateEmail } from '../assets/utills/MailValidator';
import { SET_EMAIL, selectEmail } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";

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

const ForgotPassword = ({ navigation }) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const dispatch = useDispatch();

  const handleResetPassword = async (email) => {
    const url = 'http://192.168.0.13:4000/api/users/resetPassword';
    const data = email;
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        dispatch(SET_EMAIL(email));
        navigation.navigate('ResetPassword'); // Šaljemo token kao parametar
      } else {
        handleMesage2('Error reset password, try again');
      }
    } catch (error) {
      console.error(error);
    }
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
            initialValues={{ email: '' }}
            onSubmit={async (values, { setSubmitting }) => {
              if (values.email === '') {
                handleMesage('Please enter your email');
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                handleMesage('Please enter a valid email');
              } else {
                handleResetPassword(values);
                handleMesage2('CHECK YOUR EMAIL !!!');
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                {/* EMAIL INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label="Email Address"
                  icon="mail"
                  placeholder="Enter Your Email"
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

                {/* DON'T HAVE AN ACCOUNT ALREADY ?????? */}
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
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

// INPUT COMPONENT
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
