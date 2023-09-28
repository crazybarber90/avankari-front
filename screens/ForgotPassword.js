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
        await handleMesage('Proveri svoju email adresu', "SUCCESS");
        setTimeout(() => {
          navigation.navigate('ResetPassword'); // Šaljemo token kao parametar
        }, 3000)

      } else {
        await handleMesage('Korisnik nije pronadjen!');
      }
    } catch (error) {
      await handleMesage('Korisnik nije pronadjen!');
      console.error(error);
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
      {/* <StyledContainer > */}
      <>
        <StatusBar style="dark" />
        <InnerContainer style={{ flex: 1, alignItems: "center", paddingTop: 30 }}>
          {/* LOGO ON START SCREEN */}
          <PageLogo style={{ marginBottom: 40 }} resizeMode="contain" source={require('./../assets/img/lik2.png')} />
          {/* <PageTitle>Avankari</PageTitle> */}

          <Formik
            initialValues={{ email: '' }}
            onSubmit={async (values, { setSubmitting }) => {
              if (values.email === '') {
                handleMesage('Unesi email adresu');
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                handleMesage('Tip adrese nije validan');
              } else {
                handleResetPassword(values);
                // await handleMesage('PROVERITE VAŠU EMAIL ADRESU!!!', "SUCCESS");
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea >
                {/* EMAIL INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label="Email Addresa"
                  icon="mail"
                  placeholder="petar@gmail.com"
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
                    <ButtonText>Promeni lozinku</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                {/* DON'T HAVE AN ACCOUNT ALREADY ?????? */}
                <ExtraView>
                  <ExtraText>Nemaš nalog?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Registruj se</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </>
      {/* </StyledContainer> */}
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
