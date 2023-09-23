import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {
    Card,
    Avatar,
    TextBoldStyle,
    TextNormalStyle,
} from '../../components/SearchItemStyle';


const SearchItem = ({ navigation, singleUser }) => {
    // console.log("SEARCHITEEEEEEM", singleUser)
    // if (!singleUser) {
    //     return null; // ili neki drugi fallback UI element
    // }
    return (
        <Card>
            <Avatar
                source={{ uri: singleUser.photo }}
                loadingIndicatorSource={require('./../../assets/img/avatar.png')} // putanja do avatara assets/img
                progressiveRenderingEnabled={true} // Ovo omogućava postepeno učitavanje slike
            />
            <TextBoldStyle>{singleUser.name}</TextBoldStyle>
            <TextNormalStyle>{singleUser.city}</TextNormalStyle>
            <TextNormalStyle>{singleUser.currentPlace}</TextNormalStyle>
        </Card>
    )
}

export default SearchItem

const styles = StyleSheet.create({

})