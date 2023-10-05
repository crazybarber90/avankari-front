import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextArea from '../../components/TextArea'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import {
    PageTitle,
    WelcomeContainer,
    Colors,
} from '../../components/styles';

const { brand } = Colors;
const Settings = ({ navigation }) => {
    const translation = useSelector((state) => state.translation.messages);
    return (
        // <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                {/* <View style={{ flex: 1 }}> */}
                <WelcomeContainer style={{ paddingRight: 40, paddingTop: 40 }}>
                    <PageTitle style={{ color: brand, marginTop: 20 }}>{translation.reportProblemToAdmin[1]}</PageTitle>
                    <TextArea navigation={navigation} />
                </WelcomeContainer>
                {/* </View> */}
            </TouchableWithoutFeedback>
        </>
        // {/* </KeyboardAvoidingView > */ }
    )
}

export default Settings

const styles = StyleSheet.create({})