import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import {
    AvankariImageWrapper,
    AvankariAvatar,
    ContentWrapper,
    TextWrapper,
    TextBoldAvankariStyle,
    TextNormalAvankariStyle,
    TextSpan,
    SearchListWrapper,
} from '../../components/SearchItemStyle';
import { Line } from '../../components/styles';

const Settings = ({ navigation, route }) => {
    const translation = useSelector((state) => state.translation.messages);
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
                <Line />

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>Instagram</TextSpan>{'\n'}
                        {singleUser.instagramUrl}
                    </TextNormalAvankariStyle>
                </TextWrapper>
                <Line />

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>Telefon</TextSpan>{'\n'}
                        {singleUser.phoneNumber[1]}
                    </TextNormalAvankariStyle>
                </TextWrapper>
                <Line />

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>{translation.city[2]}</TextSpan>{'\n'}
                        {singleUser.city}
                    </TextNormalAvankariStyle>
                </TextWrapper>
                <Line />

                <TextWrapper>
                    <TextNormalAvankariStyle >
                        <TextSpan>{translation.currentPlace[2]}</TextSpan>{'\n'}
                        {singleUser.currentPlace}
                    </TextNormalAvankariStyle>
                </TextWrapper>

            </ContentWrapper>
        </SearchListWrapper>
    )
}

export default Settings

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         marginTop: "20%",
//     },
//     imageContainer: {
//         width: '80%',
//         height: '45%',
//         overflow: 'hidden',
//         marginBottom: 10,
//         borderRadius: 10,
//     },
//     infoContainer: {
//         width: '90%',
//         alignItems: 'center',
//         color: 'white',
//     },
//     name: {
//         color: 'white',
//         fontSize: 20,
//         marginBottom: 10,
//     },
//     info: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
// })