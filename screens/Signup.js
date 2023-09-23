import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { validateEmail } from '../assets/utills/MailValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Keyboard Avoiding view

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // const [date, setDate] = useState(new Date(2000, 0, 1));

  // Real date of birth to be sent

  // const [dob, setDob] = useState();

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(false);
  //   setDate(currentDate);
  //   setDob(currentDate);
  // };

  // const showDatePicker = () => {
  //   setShow(true);
  // };

  //                          ========================= SIGNUP WITHOUT VERIFY TOKEN 4DIDGETS =========================
  // SIGNUP HANDLER
  //   const handleSignup = async (credentials, setSubmitting) => {
  //   setSubmitting(true);
  //   handleMesage('');
  //   const url = 'http://192.168.0.13:4000/api/users/register';
  //     //  POVEZI TELEFON NA WIFI ISTI KAO I KOMP !!!!!!!
  //   try {
  //     const response = await axios.post(url, credentials, { withCredentials: true });
  //     console.log('5555555555555555555 5555555 RESPONSE is zignup', response.data);
  //     const token = response.data.token
  //     const user = await response;
  //     if (response.statusText === 'OK') {
  //       console.log('User registered successfully');
  //     }
  //     navigation.navigate('Welcome', { ...response.data });
  //     await AsyncStorage.setItem('@token', token);
  //     await AsyncStorage.setItem('@user', JSON.stringify(user))
  //     setSubmitting(false);
  //     // console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     const message =
  //       (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  //     console.log('MESAGE IS SIGN UP', message);
  //     setSubmitting(false);
  //     handleMesage(message);
  //   }
  // };

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
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          {/* LOGO ON START SCREEN */}
          <PageTitle>Avankari</PageTitle>
          <SubTitle>Account Signup</SubTitle>

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
                handleMesage('Please fill all the fields');
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                return handleMesage('Please enter a valid email');
              } else if (values.password !== values.confirmPassword) {
                setSubmitting(false);
                return handleMesage('Password do not match');
              } else {
                handleSignup(values, setSubmitting);
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
                  placeholder="Ener Your Email"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {/* FULL NAME INPUT */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label="Full Name"
                  icon="person"
                  placeholder="Enter Your Name"
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

                {/* PASSWORD INPUT 2 */}
                <MyTextInput
                  style={{ fontFamily: CustomFont }}
                  label="Confirm Password"
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
                    <ButtonText>Signup</ButtonText>
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
                  <ExtraText>Allready have an account ?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Login</TextLinkContent>
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
