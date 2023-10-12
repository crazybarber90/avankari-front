import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { useSelector, useDispatch } from 'react-redux';

import {
    CustomFont, Colors,
    InnerContainer,
    PageTitle,
    TermsHeadings,
    TermsTextContent,
    TermsButton,
    Line,
} from '../components/styles';
const { brand, darkLight, primary, tertiary, red, search, backgroundColor } = Colors;

const TermsOfConditions = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null, // This will remove the back arrow
        });
    }, [navigation]);

    const translation = useSelector((state) => state.translation.messages);

    return (
        <KeyboardAvoidingWrapper>
            <>
                <StatusBar style="dark" />
                <InnerContainer style={{ flex: 1, alignItems: "center", paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <PageTitle>{translation.termsAndPrivacyHeading[1]}</PageTitle>
                    <Line />
                    <TermsHeadings>{translation.termsAndPrivacyHeading[2]}</TermsHeadings>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[3]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[3]}</TermsTextContent>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[4]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[4]}</TermsTextContent>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[5]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[5]}</TermsTextContent>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[6]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[6]}</TermsTextContent>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[7]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[7]}</TermsTextContent>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[8]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[8]}</TermsTextContent>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[9]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[9]}</TermsTextContent>
                    <Line />
                    <PageTitle>{translation.termsAndPrivacyHeading[11]}</PageTitle>
                    <TermsHeadings>{translation.termsAndPrivacyHeading[12]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[12]}</TermsTextContent>
                    <TermsTextContent>{translation.termsAndPrivacyContent[13]}</TermsTextContent>

                    <TermsHeadings>{translation.termsAndPrivacyHeading[13]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[14]}</TermsTextContent>
                    <TermsTextContent>{translation.termsAndPrivacyContent[141]}</TermsTextContent>
                    <TermsTextContent>{translation.termsAndPrivacyContent[142]}</TermsTextContent>

                    <TermsHeadings>{translation.termsAndPrivacyHeading[14]}</TermsHeadings>
                    <TermsTextContent>{translation.termsAndPrivacyContent[15]}</TermsTextContent>
                    <TermsTextContent>{translation.termsAndPrivacyContent[16]}</TermsTextContent>
                    <PageTitle>{translation.termsAndPrivacyContent[17]}</PageTitle>

                    <Line />

                    <TermsButton onPress={() => navigation.goBack("Login")}>
                        <Text style={{ fontFamily: CustomFont, color: "white" }} >
                            {translation.iRead[1]}
                        </Text>
                    </TermsButton >
                </InnerContainer>
            </>
        </KeyboardAvoidingWrapper>
    )
}

export default TermsOfConditions

const styles = StyleSheet.create({})