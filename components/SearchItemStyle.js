import styled from 'styled-components/native';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Colors, CustomFont } from './styles';

// SERCH LIST
export const SearchListWrapper = styled.View`
flex: 1;
align-items: center;
background-color: ${Colors.brand};
padding-top: 0%;
text-align: left;
display: flex;
`;


// SINGLE AVANKARI PROFILE

export const TextWrapper = styled.View`
  elevation: 2;
  padding-horizontal: 20px;
  border-radius: 3px;
`
export const TextBoldAvankariStyle = styled.Text`
    fontSize: 38px;
    margin-bottom: 15px;
    color: white;
    letter-spacing: 1px;
    text-align: left;
    text-shadow: 3px 3px 9px black;
    font-family: ${CustomFont};

`;

export const TextNormalAvankariStyle = styled.Text`
    fontSize: 18px;
    margin: 15px 0;
    color: white;
    text-align: left;
    text-shadow: 3px 3px 6px black;
    border-radius: 10px;
    font-family: ${CustomFont};
`;

export const TextSpan = styled.Text`
  color: ${Colors.tertiary};
  text-shadow: 2px 2px 6px ${Colors.darkLight};
  fontSize: 22px;
  font-family: ${CustomFont};
`;

export const AvankariImageWrapper = styled.View`
width: 100%;
height: 35%;
overflow: hidden;
border-radius: 30px;
elevation: 15;
backgroundColor: black,
`;

export const AvankariAvatar = styled.Image`
width: 100%;
height: 100%;
`;

export const ContentWrapper = styled.View`
width: 80%;
color: white;
padding: 20px 0;
text-align: center;
`;



// CARD AVANKARI
export const Card = styled.View`
width: 280px;
height: 350px;
border-color:${Colors.search};
border-radius: 10px;
padding-top: 30px;
align-items: center;
margin-top: 50px;
margin-bottom: 20px;
background-color: ${Colors.primary};
elevation: 10;
shadow-color: ${Colors.darkLight};
shadow-offset: 5px 4px;
shadow-opacity: 0.1;
shadow-radius: 10px;
`;

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 30px;
  margin-bottom: 10px;
`;

export const TextBoldStyle = styled.Text`
  font-size: 33px;
  margin-bottom: 10px;
  letter-spacing: 1px;
  font-family: ${CustomFont};
`;

export const TextNormalStyle = styled.Text`
    fontSize: 18px;
    margin-bottom: 5px;
    font-family: ${CustomFont};
`;


