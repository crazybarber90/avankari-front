import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
// import { KeyboardAvoidingView } from 'react-native-web'

import {
    Colors,
} from '../components/styles';
import { TextInput } from 'react-native-gesture-handler';
import { verifyEmail } from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';


const inputs = Array(4).fill('')
let newInputIndex = 0

// CONVERT OBJECT TO ARRAY AND CHECK IF EVERY KEY HAVE VALUE 
// { 0: '3',    1: '3',    2: '3',    3: '' } = false
// { 0: '3',    1: '3',    2: '3',    3: '3' } = true
const isObjValid = (obj) => {
    return Object.values(obj).every(val => val.trim())
}

const { brand, darkLight, primary } = Colors;

const Verification = ({ route, navigation }) => {
    const { profile } = route.params

    const input = useRef()
    const [OTP, setOTP] = useState({ 0: '', 1: '', 2: '', 3: '' })
    const [nextInputIndex, setNextInputIndex] = useState(0)

    const handleChangeText = (text, index) => {
        const newOTP = { ...OTP }
        newOTP[index] = text;
        setOTP(newOTP)

        const lastInputIndex = inputs.length - 1
        if (!text) newInputIndex = index === 0 ? 0 : index - 1;
        else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        setNextInputIndex(newInputIndex)
    }

    const submitOTP = async () => {
        Keyboard.dismiss()

        if (isObjValid(OTP)) { // OTP =  {0: '5',    1: '4',    2: '2',    3: '7'}
            let val = '';

            Object.values(OTP).forEach(v => {
                val += v       //  '5427
            })

            const res = await verifyEmail(val, profile._id)
            if (!res.success) return console.log(res.error)

            const token = profile.token

            console.log("RES", res)
            if (profile && profile.token) {
                await AsyncStorage.setItem('@token', token)
                await AsyncStorage.setItem('@user', JSON.stringify(profile))
            } else {
                console.log("Profile objekat nije ispravno definisan ili nema vrednost za 'token'.")
            }

            // STACK NAVIGATION IS REPLACING SCREEN VERIFICATION WITH WELCOME NOT STACKING
            navigation.dispatch(StackActions.replace('Welcome', { ...profile }))
            // navigation.navigate('Welcome', { ...profile })
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
        alignItems: "center"
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