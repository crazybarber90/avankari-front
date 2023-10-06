import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';


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
const { brand, darkLight, primary, search, tertiary } = Colors;

// DATE PICKER  CALENDAR
// import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = ({ navigation }) => {
  const translation = useSelector((state) => state.translation.messages);
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [isChecked, setIsChecked] = useState(false);

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

  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
    console.log('isChecked:', isChecked);
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
        <StatusBar style="dark" />
        <InnerContainer style={{ flex: 1, alignItems: "center", paddingTop: 30 }}>
          {/* LOGO ON START SCREEN */}
          {/* <PageTitle>Avankari</PageTitle> */}
          <SubTitle style={{ paddingTop: 20, fontSize: 22 }}>{translation.register[2]}</SubTitle>

          {/* DATE PICKER CALENDAR COMPONENT */}
          {/* {show && (
            <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange} />
          )} */}
          {/* npm install @react-native-community/datetimepicker  verziju "6.5.2",*/}


          {/* VALIDACIJA FORMIK / removed :  dateOfBirth: ''*/}
          <Formik
            initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
            onSubmit={(values, { setSubmitting }) => {
              // values = {...values, dateOfBirth: dob};
              // console.log('VALUES', values);
              if (values.email == '' || values.name == '' || values.password == '' || values.confirmPassword == '') {
                handleMesage(translation.fillAllFields[1]);
                setSubmitting(false);
              } else if (!validateEmail(values.email)) {
                setSubmitting(false);
                return handleMesage(translation.emailNotValid[1]);
              } else if (values.password !== values.confirmPassword) {
                setSubmitting(false);
                return handleMesage(translation.passwordsNotMatch[1]);
              } else if (values.password.length < 6) {
                setSubmitting(false);
                return handleMesage(translation.passwordMustBe6[1]);
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
                  label={translation.emailLabel[1]}
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
                  label={translation.name[1]}
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
                  label={translation.password[1]}
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
                  label={translation.repeatPassword[1]}
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

                {/*  CHECKBOX FOR TERMS OF USE */}

                <View>
                  <View style={{ marginVertical: 15 }}>
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

                {/* THREE DOTS  */}
                <MsgBox type={messageType}>{message}</MsgBox>

                {/* LOGIN BUTTON */}
                {!isSubmitting && (
                  <StyledButton onPress={isChecked ? handleSubmit : () => handleMesage(translation.youMustAgree[1])}>
                    <ButtonText>{translation.register[1]}</ButtonText>
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
                  <ExtraText>{translation.allreadyHaveAcc[1]}</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>{translation.login[1]}</TextLinkContent>
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
