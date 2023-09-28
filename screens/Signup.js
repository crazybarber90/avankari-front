import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { validateEmail } from '../assets/utills/MailValidator';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { StackActions } from '@react-navigation/native';

//formik
import { Formik } from 'formik';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  CustomFont,
  Colors,
  StyledContainer,
  InnerContainer,
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

// Destructured colors from 1st prop Colors from style
const { brand, darkLight, primary } = Colors;

// DATE PICKER  CALENDAR
// import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleSignup = async (credentials, setSubmitting) => {
    setSubmitting(true);
    handleMesage('');
    const url = 'http://192.168.0.13:4000/api/users/register';
    //  POVEZI TELEFON NA WIFI ISTI KAO I KOMP !!!!!!!
    try {
      const response = await axios.post(url, credentials, { withCredentials: true });

      if (response.statusText === 'OK') {
        console.log('User registered successfully');
      }
      navigation.dispatch(StackActions.replace('Verification', { profile: response.data }))
      setSubmitting(false);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      console.log('MESAGE IS SIGN UP', message);
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
      {/* <StyledContainer> */}
      <>
        <StatusBar style="dark" />
        <InnerContainer style={{ flex: 1, alignItems: "center", paddingTop: 40 }}>
          {/* LOGO ON START SCREEN */}
          <PageTitle>Avankari</PageTitle>
          <SubTitle>Registracija</SubTitle>

          {/* DATE PICKER CALENDAR COMPONENT */}
          {show && (
            <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange} />
          )}

          {/* VALIDACIJA FORMIK / removed :  dateOfBirth: ''*/}
          <Formik
            initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
            onSubmit={(values, { setSubmitting }) => {
              // values = {...values, dateOfBirth: dob};
              // console.log('VALUES', values);
              if (values.email == '' || values.name == '' || values.password == '' || values.confirmPassword == '') {
                handleMesage('Popuni sva polja');
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                return handleMesage('Unesi validan Email');
              } else if (values.password !== values.confirmPassword) {
                setSubmitting(false);
                return handleMesage('Šifre se ne podudaraju');
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                {/* EMAIL INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont, }}
                  label="Email Adresa"
                  icon="mail"
                  placeholder="Petar@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {/* FULL NAME INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label="Ime"
                  icon="person"
                  placeholder="Petar"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />

                {/* DATE PICKER INPUT */}
                {/* <MyTextInput
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  value={dob ? dob.toDateString() : ''}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                /> */}

                {/* PASSWORD INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label="Lozinka"
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

                {/* PASSWORD INPUT 2 */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label="Potvrod Lozinku"
                  icon="lock"
                  placeholder="* * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('password')}
                  value={values.confirmPassword}
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
                    <ButtonText>Registruj se</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                {/* SEPARATOR BETWEEN LOGIN AND REGISTER */}
                <Line />

                {/* DON'T HAVE AN ACCOUNT ALLREADY ?????? */}
                <ExtraView>
                  <ExtraText>Već imaš nalog ?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Uloguj se</TextLinkContent>
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

//INPUT COMPONENT
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {/* <StyledTextInput {...props} /> */}

      {!isDate && <StyledTextInput {...props} />}

      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
