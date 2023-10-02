import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
//formik
import { Formik } from 'formik';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import { selectEmail } from '../redux/features/auth/authSlice';

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
    CustomFont,
} from '../components/styles';


const { brand, darkLight, primary } = Colors;


function ResetPasswordScreen({ navigation, route }) {
    const translation = useSelector((state) => state.translation.messages);
    // const { token } = route.params; // Dobijanje tokena iz URL-a ili navigacije
    const resendEmail = useSelector(selectEmail)
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


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

            if (response.data.success) {
                handleMesage2(translation.resetPasswordSuccesfully[1]);
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 1500)
            } else {
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
        if (isButtonDisabled) {
            return;
        }

        const url = 'http://192.168.0.13:4000/api/users/resetPassword';
        const data = resendEmail

        try {
            await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.data.success) {
                    handleMesage(translation.changePasswordCodeSent[1], "SUCCESS");
                    setIsButtonDisabled(true)
                } else {
                    handleMesage(translation.anErrorOccured[1]);
                }
            })
        } catch (error) {
            console.error(error)
            handleMesage(translation.anErrorOccured[1]);
        }
    };


    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
            <KeyboardAvoidingWrapper>
                <StyledContainer style={{ width: 400, alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 50, backgroundColor: 'transparent' }}>
                    <StatusBar style="dark" />
                    <Text style={{ marginBottom: 50, fontSize: 26, color: brand, fontFamily: CustomFont }}>
                        {translation.changePassword[2]}
                    </Text>
                    <InnerContainer>
                        <Formik
                            initialValues={{ newPassword: '', confirmPassword: '', code: '' }}
                            onSubmit={(values, { setSubmitting }) => {

                                if (values.newPassword == '' || values.confirmPassword == '' || values.code == '') {
                                    setSubmitting(false);
                                    return handleMesage(translation.fillAllFields[1]);
                                } else if (values.newPassword !== values.confirmPassword) {
                                    setSubmitting(false);
                                    return handleMesage(translation.passwordsNotMatch[1]);
                                } else {
                                    handleSubmitReset(values, setSubmitting);
                                }
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                                <StyledFormArea>
                                    {/* EMAIL INPUT */}
                                    <MyTextInput
                                        style={{ fontFamily: CustomFont }}
                                        label={translation.verifyCode[1]}
                                        icon="mail"
                                        placeholder={translation.yourCode[1]}
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('code')}
                                        onBlur={handleBlur('code')}
                                        value={values.code}
                                        isPassword={false}
                                        keyboardType="email-address"

                                    />
                                    {/* PASSWORD INPUT */}
                                    <MyTextInput
                                        style={{ fontFamily: CustomFont }}
                                        label={translation.newPassword[1]}
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
                                        style={{ fontFamily: CustomFont }}
                                        label={translation.repeatPassword[1]}
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
                                    <MsgBox style={{ marginVertical: 10 }} type={messageType}>{message}</MsgBox>

                                    {/* LOGIN BUTTON */}
                                    {!isSubmitting && (
                                        // <StyledButton onPress={handleSubmitReset}>
                                        <StyledButton onPress={handleSubmit}>
                                            <ButtonText>{translation.change[1]}</ButtonText>
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
                            <TextLink>
                                <TextLinkContent style={{ margin: 20, opacity: isButtonDisabled ? 0.5 : 1, }} onPress={handleResendCode}>{translation.resendCode[1]}</TextLinkContent>
                                <TextLinkContent onPress={() => navigation.navigate('Login')}>{translation.login[1]}</TextLinkContent>
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

