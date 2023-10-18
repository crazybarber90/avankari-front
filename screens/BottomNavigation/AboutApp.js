import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { useSelector, useDispatch } from 'react-redux';

import {
    CustomFont, Colors,
    InnerContainer,
    PageTitle,
    TermsHeadings,
    TermsTextContent,
    TermsButton,
    Line,
    SubTitle,
    NormalText
} from '../../components/styles';
const { brand, darkLight, primary, tertiary, red, search, backgroundColor } = Colors;

const AboutApp = ({ navigation }) => {



    const translation = useSelector((state) => state.translation.messages);

    return (
        <KeyboardAvoidingWrapper>
            <>
                <StatusBar style="dark" />
                <InnerContainer style={{ flex: 1, paddingTop: 20, paddingBottom: 100, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, textAlign: "center", padding: 10, marginBottom: 20 }}>{translation.about[1]}</Text>
                    <Text style={{ fontSize: 22, marginBottom: 20, letterSpacing: 1, color: search, }}>{translation.about[2]}</Text>

                    <NormalText style={{}}>{translation.about[3]}
                        {'\n'}
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.about[4]}
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.about[5]}
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.about[6]}
                        {'\n'}
                    </NormalText>

                    <NormalText style={{ marginBottom: 10, color: brand }}>{translation.about[7]}
                    </NormalText>
                    <Line />

                    {/* HOME */}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 8, fontSize: 26, color: search }}>HOME </Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>{translation.homeAbout[1]}
                    </NormalText>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Facebook {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>Instagram {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>{translation.phoneNumber[1]} {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>{translation.yourTable[1]} {'\n'}</Text>
                    </View>
                    <NormalText>{translation.homeAbout[2]}
                    </NormalText>
                    <NormalText>{translation.homeAbout[3]}</NormalText>
                    <NormalText style={{ color: search, fontWeight: "bold" }}>{translation.homeAbout[4]}
                    </NormalText>
                    <NormalText style={{ color: search }}>{translation.homeAbout[5]} </NormalText>
                    <NormalText>{translation.homeAbout[6]}</NormalText>
                    <NormalText>{translation.homeAbout[7]}</NormalText>
                    <NormalText>{translation.homeAbout[8]}</NormalText>


                    <Line />

                    {/* PROFILE */}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 8, fontSize: 26, color: search }}>PROFILE </Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[1]}
                    </NormalText>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>{translation.city[2]} {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>{translation.currentPlace[2]} {'\n'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{'\u2022'}</Text>
                        <Text style={{ marginLeft: 8, fontSize: 16, color: search }}>{translation.profileAbout[2]} {'\n'}</Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[3]} {'\n'}
                    </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[4]}</NormalText>
                    <NormalText style={{ marginBottom: 10, color: search }}>{translation.profileAbout[5]}</NormalText>
                    <NormalText style={{ marginBottom: 10, color: search }}>{translation.profileAbout[6]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[7]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[8]}
                        {'\n'}</NormalText>

                    <NormalText style={{ marginBottom: 10, color: search }}>{translation.profileAbout[9]} </NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[10]} </NormalText>
                    <NormalText style={{ marginBottom: 10, fontWeight: "bold" }}>{translation.profileAbout[11]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[12]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[13]}</NormalText>

                    <NormalText style={{ marginBottom: 10, color: search }}>{translation.profileAbout[14]}</NormalText>
                    <NormalText style={{ marginBottom: 10, fontWeight: "bold" }}>{translation.profileAbout[15]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[16]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[17]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.profileAbout[18]}</NormalText>
                    <Line />

                    {/* SEARCH */}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 8, fontSize: 26, color: search }}>{translation.searchAbout[1]}</Text>
                    </View>
                    <NormalText style={{ marginBottom: 10 }}>{translation.searchAbout[2]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.searchAbout[3]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.searchAbout[4]}</NormalText>

                    <NormalText style={{ marginBottom: 10, color: search }}>{translation.searchAbout[5]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.searchAbout[6]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.searchAbout[7]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.searchAbout[8]}</NormalText>
                    <NormalText style={{ marginBottom: 10 }}>{translation.searchAbout[9]}</NormalText>


                </InnerContainer>
            </>
        </KeyboardAvoidingWrapper>
    )
}

export default AboutApp

const styles = StyleSheet.create({})