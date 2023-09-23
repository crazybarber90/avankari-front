import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import {
    AvankariImageWrapper,
    AvankariAvatar,
    ContentWrapper,
    TextWrapper,
    TextBoldAvankariStyle,
    TextNormalAvankariStyle,
    TextSpan,
    SearchListWrapper
} from '../../components/SearchItemStyle';

const Settings = ({ navigation, route }) => {
    console.log("------------------------------------")
    console.log("ROUTE IZ SINGLE AVANKARI", route)
    console.log("------------------------------------")
    const { singleUser } = route.params
    return (
        <SearchListWrapper>
            <AvankariImageWrapper>
                <AvankariAvatar
                    source={{ uri: singleUser.photo }}
                    resizeMode="cover"
                />
            </AvankariImageWrapper>
            <ContentWrapper>
                <TextBoldAvankariStyle>{singleUser.name}</TextBoldAvankariStyle>


                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>Facebook</TextSpan>{'\n'}
                        {singleUser.facebookUrl}
                    </TextNormalAvankariStyle>
                </TextWrapper>

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>Instagram</TextSpan>{'\n'}
                        {singleUser.instagramUrl}
                    </TextNormalAvankariStyle>
                </TextWrapper>

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>Telefon</TextSpan>{'\n'}
                        {singleUser.phoneNumber}
                    </TextNormalAvankariStyle>
                </TextWrapper>

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>GRAD</TextSpan>{'\n'}
                        {singleUser.city}
                    </TextNormalAvankariStyle>
                </TextWrapper>

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>Mesto</TextSpan>{'\n'}
                        {singleUser.currentPlace}
                    </TextNormalAvankariStyle>
                </TextWrapper>

            </ContentWrapper>
        </SearchListWrapper>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: "20%",
    },
    imageContainer: {
        width: '80%',
        height: '45%',
        overflow: 'hidden', // Da bi se slika pravilno obrezivala
        marginBottom: 10, // Dodajte razmak između slike i informacija
        borderRadius: 10,
    },
    infoContainer: {
        width: '90%',
        alignItems: 'center',
        color: 'white',
    },
    name: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10, // Dodajte razmak između imena i ostalih informacija
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
})