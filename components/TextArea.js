import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator, Text, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import { StyledButtonSocials, ButtonText, MsgBox, Colors, CustomFont } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


const { brand, darkLight, primary } = Colors;
const TextArea = ({ navigation }) => {
    const translation = useSelector((state) => state.translation.messages);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [text, setText] = useState('');
    const [loader, setLoader] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleTextChange = (value) => {
        setText(value);
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


    const handleSubmit = async () => {
        setLoader(true);

        if (isButtonDisabled) {
            return;
        }

        if (text === "") {
            setLoader(false)
            return handleMesage(translation.enterText[2])
        } else if (text.length < 10) {
            setLoader(false)
            return handleMesage(translation.atleast10characters[1])
        }

        try {
            const token = await AsyncStorage.getItem("@token");

            if (!token) {
                handleMesage(translation.notAvailableToken[1]);
                setLoader(false);
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const url = 'http://192.168.0.13:4000/api/users/send-support-email';

            const response = await axios.post(url, { text }, { headers });

            if (response.status === 200) {

                handleMesage(response.data.message, "SUCCESS");
                setTimeout(() => {
                    setText("")
                    navigation.navigate('Home');
                }, 6000)

                setLoader(false);
                setIsButtonDisabled(true);
            }

            return response.data;

        } catch (error) {
            handleMesage(translation.wait1hourProblemReport[1])
            setLoader(false)
            setIsButtonDisabled(true)
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder={translation.enterText[1]}
                value={text}
                onChangeText={handleTextChange}
                textAlignVertical="top"
                multiline={true}
            />
            {!loader && (
                <StyledButtonSocials onPress={handleSubmit} style={{ marginBottom: 20, opacity: isButtonDisabled ? 0.5 : 1, marginTop: 20 }} disabled={isButtonDisabled}>
                    <ButtonText>{translation.send[1]}</ButtonText>
                </StyledButtonSocials>
            )}

            {loader && (
                <StyledButtonSocials style={{ marginBottom: 20 }} disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                </StyledButtonSocials>
            )}
            <MsgBox type={messageType}>
                <Text style={{ color: messageType === 'SUCCESS' ? 'green' : 'red' }}>{message}</Text>
            </MsgBox>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        width: Dimensions.get('window').width * 0.8, // Postavite širinu na 60% širine ekrana
        height: Dimensions.get('window').height * 0.3, // Postavite visinu na 30% visine ekrana
        // borderColor: brand,
        // borderWidth: 1,
        padding: 20,
        fontFamily: CustomFont,
        elevation: 2,
        color: brand,
        fontSize: 15,
    },
});

export default TextArea;
