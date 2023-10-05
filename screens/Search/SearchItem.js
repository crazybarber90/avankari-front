import { StyleSheet, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
    const translation = useSelector((state) => state.translation.messages);

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
            <TextNormalStyle><Span>{translation.inCity[1]}</Span> {singleUser.city}</TextNormalStyle>
            <TextNormalStyle><Span>{translation.location[1]}</Span>  {singleUser.currentPlace}</TextNormalStyle>
        </Card>
    )
}

export default SearchItem

const styles = StyleSheet.create({

})