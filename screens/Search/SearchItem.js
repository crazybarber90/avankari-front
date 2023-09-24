import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {
    Card,
    Avatar,
    TextBoldStyle,
    TextNormalStyle,
    TextSpan,
    Span
} from '../../components/SearchItemStyle';


const SearchItem = ({ navigation, singleUser }) => {
    console.log("SEARCHITEEEEEEM", singleUser)
    // if (!singleUser) {
    //     return null; // ili neki drugi fallback UI element
    // }
    return (
        <Card style={{ elevation: 12 }}>
            <Avatar
                source={{ uri: singleUser.photo }}
                loadingIndicatorSource={require('./../../assets/img/avatar.png')} // putanja do avatara assets/img
                progressiveRenderingEnabled={true} // Ovo omogućava postepeno učitavanje slike
            />
            <TextBoldStyle>{singleUser.name}</TextBoldStyle>
            <TextNormalStyle><Span>U gradu :</Span> {singleUser.city}</TextNormalStyle>
            <TextNormalStyle><Span>Lokacija :</Span>  {singleUser.currentPlace}</TextNormalStyle>
        </Card>
    )
}

export default SearchItem

const styles = StyleSheet.create({

})