import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {
    CustomFont, Colors,
    InnerContainer,
    PageTitle, PageTitleSmaller,
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

const TermsOfConditions = () => {
    return (
        <KeyboardAvoidingWrapper>
            <>
                <StatusBar style="dark" />
                <InnerContainer style={{ flex: 1, alignItems: "center", paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <PageTitle> Uslovi Koriscenja Aplikacije</PageTitle>
                    <Line />
                    <SubTitle style={{ fontSize: 16 }}>TermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions,TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions , TermsOfConditions, TermsOfConditions,TermsOfConditionsTermsOfConditions </SubTitle>
                    <Line />
                </InnerContainer>
            </>
        </KeyboardAvoidingWrapper>
    )
}

export default TermsOfConditions

const styles = StyleSheet.create({})