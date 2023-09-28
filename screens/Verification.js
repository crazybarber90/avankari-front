import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import {
    Colors, MsgBox,
} from '../components/styles';
import { TextInput } from 'react-native-gesture-handler';
import { verifyEmail } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
// import { useDispatch } from "react-redux";
// import { SET_USER } from '../redux/features/auth/authSlice';

const inputs = Array(4).fill('')
// create array with 4 empty strings ['' , '', '', '']
let newInputIndex = 0

// CONVERT OBJECT TO ARRAY AND CHECK IF EVERY KEY HAVE VALUE 
// { 0: '3',    1: '3',    2: '3',    3: '' } = false
// { 0: '3',    1: '3',    2: '3',    3: '3' } = true
const isObjValid = (obj) => {
    return Object.values(obj).every(val => val.trim())
    //['3', '3', '3', '3']
}

const { brand, darkLight, primary } = Colors;

const Verification = ({ route, navigation }) => {

    // const dispatch = useDispatch()
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [verificationStatus, setVerificationStatus] = useState(null);

    const { profile } = route.params

    const input = useRef()
    const [OTP, setOTP] = useState({ 0: '', 1: '', 2: '', 3: '' })
    const [nextInputIndex, setNextInputIndex] = useState(0)

    const handleChangeText = (text, index) => {
        const newOTP = { ...OTP }
        newOTP[index] = text;
        setOTP(newOTP)

        const lastInputIndex = inputs.length - 1 // 4-1 = 3
        if (!text) newInputIndex = index === 0 ? 0 : index - 1;
        else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        setNextInputIndex(newInputIndex)
    }

    const handleMesage = (message, type = 'FAILED',) => {
        setMessage(message);
        setMessageType(type);

        // timeout da sakrijete poruku nakon 5 sekundi
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 5000);
    };
    const submitOTP = async () => {
        Keyboard.dismiss();

        if (isObjValid(OTP)) {
            let val = '';

            Object.values(OTP).forEach(v => {
                val += v;
            })

            try {
                const res = await verifyEmail(val, profile._id);

                if (res && res.success) {
                    const token = profile.token;

                    if (profile && profile.token) {
                        await AsyncStorage.setItem('@token', token);
                        await AsyncStorage.setItem('@user', JSON.stringify(profile));
                    } else {
                        console.log("Profile objekat nije ispravno definisan ili nema vrednost za 'token'.");
                    }

                    // await dispatch(SET_USER(profile))
                    handleMesage(res.message, 'SUCCESS');
                    setTimeout(() => {
                        navigation.dispatch(StackActions.replace('Welcome', { ...profile }));
                    }, 1500);
                } else {
                    // If res is not defined or res.success is not true
                    handleMesage(res ? res.message : "Pogrešan pin, pokušaj ponovo");
                }
            } catch (error) {
                console.error("Error in submitOTP:", error);
                handleMesage("An error occurred while verifying the email. Please try again");
            }
        } else {
            handleMesage("Unesi ceo pin");
        }
    }

    useEffect(() => {
        input.current.focus()
    }, [nextInputIndex])

    return <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.heading}>
            Please verify your email, PIN has been sent to your email!
        </Text>
        <View style={styles.otpContainer}>
            {inputs.map((inp, index) => {
                return (
                    <View key={index.toString()} style={styles.inputContainer}>
                        <TextInput
                            value={OTP[index]}
                            onChangeText={(text) => handleChangeText(text, index)}
                            placeholder='0'
                            style={styles.input}
                            keyboardType='numeric'
                            maxLength={1}
                            ref={nextInputIndex === index ? input : null}
                        />
                    </View>)
            })}
        </View>
        {/* {res?.success ? <MsgBox type="SUCCESS">{message}</MsgBox> : <MsgBox type="FAILED">{message}</MsgBox>} */}
        {/* <MsgBox type={messageType}>{message}</MsgBox> */}
        {/* Poruka o grešci za status "fail" */}

        <MsgBox type={messageType} style={{ paddingHorizontal: 20, textAlign: "center" }}>
            <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
        </MsgBox>


        <TouchableOpacity style={styles.submitIcon} onPress={submitOTP}>
            <Icon name="checkmark-outline" size={24} color="#fff" />
        </TouchableOpacity>
    </KeyboardAvoidingView>
}

export default Verification

const { width } = Dimensions.get("window")
const inputWitdh = Math.round(width / 6)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        color: brand,
        textAlign: 'center',
        marginBottom: 15
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: inputWitdh / 2,

    },
    inputContainer: {
        width: inputWitdh,
        height: inputWitdh,
        borderWidth: 2,
        borderColor: brand,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 15,
    },
    input: {
        fontSize: 25,
        padding: 20,
    },
    submitIcon: {
        alignSelf: "center",
        padding: 15,
        backgroundColor: brand,
        borderRadius: 50,
        marginTop: 15,

    }
})