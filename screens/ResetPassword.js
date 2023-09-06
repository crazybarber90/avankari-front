// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator, Platform } from 'react-native';
// import axios from 'axios';
// import { validateEmail } from '../assets/utills/MailValidator';


// //formik
// import { Formik } from 'formik';
// //icons
// import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// import {
//     Colors,
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     StyledFormArea,
//     LeftIcon,
//     StyledInputLabel,
//     StyledTextInput,
//     StyledButton,
//     ButtonText,
//     MsgBox,
//     MsgBox2,
//     Line,
//     ExtraView,
//     ExtraText,
//     TextLink,
//     TextLinkContent,
// } from '../components/styles';

// import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// // Destructured colors from 1st prop Colors from style
// const { brand, darkLight, primary } = Colors;

// // Keyboard Avoiding view
// // import * as Google from 'expo-google-app-auth';
// const ForgotPassword = ({ navigation }) => {
//     const [message, setMessage] = useState();
//     const [messageType, setMessageType] = useState();

//     const handleResetPassword = async (email) => {
//         // setSubmitting(true);
//         // handleMesage('');
//         const url = 'http://192.168.0.13:4000/api/users/reset-password';
//         const response = await axios.post(url, email, { withCredentials: true });

//         console.log("EMAILLLLL", email)
//         console.log("response ", response.data)

//         navigation.navigate('Login');


//         //   const message =
//         //     (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         //   setSubmitting(false);
//         //   handleMesage(message);
//         // }
//     };



//     const handleMesage = (message, type = 'FAILED') => {
//         setMessage(message);
//         setMessageType(type);
//     };

//     const handleMesage2 = (message, type = 'SUCCESS') => {
//         setMessage(message);
//         setMessageType(type);
//     };

//     return (
//         <KeyboardAvoidingWrapper>
//             <StyledContainer>
//                 <StatusBar style="dark" />
//                 <InnerContainer>
//                     {/* LOGO ON START SCREEN */}
//                     <PageLogo resizeMode="cover" source={require('./../assets/img/ja.jpg')} />
//                     <PageTitle>Avankari</PageTitle>

//                     <Formik
//                         initialValues={{ email: '' }}
//                         onSubmit={(values, { setSubmitting }) => {

//                             if (values.email == '') {
//                                 handleMesage('Please enter your email');
//                                 setSubmitting(false);
//                             } else if (!validateEmail(values.email)) {
//                                 setSubmitting(false);
//                                 return handleMesage('Please enter a valid email');
//                             } else {
//                                 setTimeout(() => {
//                                     handleResetPassword(values, setSubmitting);
//                                 }, 3000)
//                                 return handleMesage2('CHECK YOUR EMAIL !!!');
//                             }
//                         }}
//                     >
//                         {({ handleChange, handleBlur, handleSubmitReset, values, isSubmitting }) => (
//                             <StyledFormArea>
//                                 {/* EMAIL INPUT */}
//                                 <MyTextInput
//                                     label="Email Address"
//                                     icon="mail"
//                                     placeholder="Ener Your Email"
//                                     placeholderTextColor={darkLight}
//                                     onChangeText={handleChange('email')}
//                                     onBlur={handleBlur('email')}
//                                     value={values.email}
//                                     keyboardType="email-address"
//                                 />

//                                 {/* THREE DOTS  */}
//                                 {messageType === 'SUCCESS' ? <MsgBox2 type={messageType}>{message}</MsgBox2> : <MsgBox type={messageType}>{message}</MsgBox>}


//                                 {/* SEPARATOR BETWEEN LOGIN AND REGISTER */}
//                                 <Line />


//                                 {/* LOGIN BUTTON */}
//                                 {!isSubmitting && (
//                                     <StyledButton onPress={handleSubmitReset}>
//                                         <ButtonText>Reset Password</ButtonText>
//                                     </StyledButton>
//                                 )}

//                                 {isSubmitting && (
//                                     <StyledButton disabled={true}>
//                                         <ActivityIndicator size="large" color={primary} />
//                                     </StyledButton>
//                                 )}

//                                 {/* DON'T HAVE AN ACCOUNT ALLREADY ?????? */}
//                                 <ExtraView>
//                                     <ExtraText>Don't have an account allready?</ExtraText>
//                                     <TextLink onPress={() => navigation.navigate('Signup')}>
//                                         <TextLinkContent>Signup</TextLinkContent>
//                                     </TextLink>
//                                 </ExtraView>
//                             </StyledFormArea>
//                         )}
//                     </Formik>
//                 </InnerContainer>
//             </StyledContainer>
//         </KeyboardAvoidingWrapper>
//     );
// };

// //INPUT COMPONENT
// const MyTextInput = ({ label, icon, ...props }) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Octicons name={icon} size={30} color={brand} />
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             <StyledTextInput {...props} />
//         </View>
//     );
// };

// export default ForgotPassword;




import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, Button, TouchableOpacity, Keyboard } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
//formik
import { Formik } from 'formik';


import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { verifyEmail } from '../utils/auth';

import { selectEmail } from '../redux/features/auth/authSlice';
//formik

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';
import {
    Colors,
    InnerContainer,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    TextLinkContent,
    ExtraView,
    StyledTextInput,
    ExtraText,
    RightIcon,
    StyledContainer,
    StyledButton,
    ButtonText,
    MsgBox,
    TextLink,
    Line,
} from '../components/styles';
import axios from 'axios';


const { brand, darkLight, primary } = Colors;


function ResetPasswordScreen({ navigation, route }) {
    // const { token } = route.params; // Dobijanje tokena iz URL-a ili navigacije
    const resendEmail = useSelector(selectEmail)
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [verificationStatus, setVerificationStatus] = useState(null);

    console.log("EMAIL IS REDUXA==================================", resendEmail)

    const handleMesage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    const handleMesage2 = (message, type = 'SUCCESS') => {
        setMessage(message);
        setMessageType(type);
    };

    const handleSubmitReset = async (credentials, setSubmitting) => {
        // console.log("KREDENCIJALI", credentials)
        // console.log("resendEmail IZ REDUX STEJTA", resendEmail)
        console.log("HANDLE SUBMIT RESET ++++++++++++++++")
        setSubmitting(true);
        handleMesage('');
        const url = 'http://192.168.0.13:4000/api/users/resetPasswordConfirm';
        const data = credentials;
        const newData = { ...credentials, email: resendEmail }
        //  POVEZI TELEFON NA WIFI ISTI KAO I KOMP !!!!!!!
        try {
            const response = await axios.post(url, newData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("++++++++++++++++++++++++++RESPONSE PRE SVEGA ", response)
            if (response.data.success) {
                console.log('PASSWORD RESET successfully');
                handleMesage2('Password Reset succesfully');
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 1500)
            } else {
                console.log("RESPONSE DATA ERROR", response)
                handleMesage(response.data.message)
                setSubmitting(false);

            }
        } catch (error) {
            console.error(error)
            handleMesage("error");
            setSubmitting(false);
        }
    }

    const handleResendCode = async () => {
        const url = 'http://192.168.0.13:4000/api/users/resetPassword';
        const data = resendEmail

        try {
            await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.data.success) {
                    handleMesage('Verification code has been resent succesfully');
                } else {
                    handleMesage('Failed to resend verification code, try again');
                }
            })
        } catch (error) {
            console.error(error)
            handleMesage('Failed to resend verification code, try again');
        }
    };


    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
            <KeyboardAvoidingWrapper>
                <StyledContainer style={{ width: 400, alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 50, backgroundColor: 'transparent' }}>
                    <StatusBar style="dark" />
                    <Text style={{ marginBottom: 30, fontSize: 26, fontWeight: 'bold', color: brand }}>
                        Reset Password Confirmation
                    </Text>
                    <InnerContainer>
                        <Formik
                            initialValues={{ newPassword: '', confirmPassword: '', code: '' }}
                            onSubmit={(values, { setSubmitting }) => {

                                if (values.newPassword == '' || values.confirmPassword == '' || values.code == '') {
                                    setSubmitting(false);
                                    return handleMesage('Please fill all the fields');

                                } else if (values.newPassword !== values.confirmPassword) {
                                    setSubmitting(false);
                                    return handleMesage('Password do not match');
                                } else {
                                    handleSubmitReset(values, setSubmitting);
                                    console.log("HANDLE SUBMIT RESET IZ FORMIKA")

                                }
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                                <StyledFormArea>

                                    {/* EMAIL INPUT */}
                                    <MyTextInput
                                        label="Verification Code"
                                        icon="mail"
                                        placeholder="Ener Your Code"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('code')}
                                        onBlur={handleBlur('code')}
                                        value={values.code}
                                        isPassword={false}
                                        keyboardType="email-address"

                                    />
                                    {/* PASSWORD INPUT */}
                                    <MyTextInput
                                        label="New Password"
                                        icon="lock"
                                        placeholder="* * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('newPassword')}
                                        onBlur={handleBlur('newPassword')}
                                        value={values.newPassword}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />
                                    {/* PASSWORD INPUT */}
                                    <MyTextInput
                                        label="Confirm Password"
                                        icon="lock"
                                        placeholder="* * * * * * *"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
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
                                        // <StyledButton onPress={handleSubmitReset}>
                                        <StyledButton onPress={handleSubmit}>
                                            <ButtonText>Submit</ButtonText>
                                        </StyledButton>
                                    )}

                                    {isSubmitting && (
                                        <StyledButton disabled={true}>
                                            <ActivityIndicator size="large" color={primary} />
                                        </StyledButton>
                                    )}
                                </StyledFormArea>
                            )}
                        </Formik>
                        <ExtraView>
                            <TextLink onPress={() => console.log("lol")}>
                                <TextLinkContent style={{ margin: 20 }} onPress={handleResendCode}>Resend Code</TextLinkContent>
                                <TextLinkContent onPress={() => navigation.navigate('Login')}>Back to Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </InnerContainer>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        </View>
    )
}

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

export default ResetPasswordScreen;

