import styled from 'styled-components/native';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Colors, CustomFont, Cinzel } from './styles';

// SERCH LIST
export const SearchListWrapper = styled.View`
flex: 1;
align-items: center;
background-color: ${Colors.secondary};
padding-top: 10%;
text-align: left;
display: flex;
`;


// SINGLE AVANKARI PROFILE

export const TextWrapper = styled.View`
  elevation: 2;
  padding-horizontal: 20px;
  border-radius: 3px;
  shadow-color: ${Colors.darkLight};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`
export const TextBoldAvankariStyle = styled.Text`
    fontSize: 30px;
    margin-bottom: 15px;
    color: ${Colors.search};
    letter-spacing: 1px;
    text-align: left;
    text-shadow: 1px 1px 5px ${Colors.tertiary};
    font-family: ${CustomFont};

`;

export const TextNormalAvankariStyle = styled.Text`
    fontSize: 18px;
    margin: 5px 0;
    color: ${Colors.search};
    text-align: left;
    text-shadow: 1px 1px 6px ${Colors.darkLight};
    border-radius: 10px;
    font-family: ${CustomFont};
`;

export const TextSpan = styled.Text`
color: ${Colors.tertiary};
  fontSize: 16px;
  font-family: ${CustomFont};
`;

export const Span = styled.Text`
  color: ${Colors.tertiary};
  fontSize: 14px;
  font-family: ${CustomFont};
`;

export const AvankariImageWrapper = styled.View`
width: 100%;
height: 35%;
overflow: hidden;
border-radius: 30px;
elevation: 15;
backgroundColor: black;
shadow-color: ${Colors.darkLight};
shadow-offset: 15px 14px;
shadow-opacity: 0.1;
shadow-radius: 4px;
`;

export const AvankariAvatar = styled.Image`
width: 100%;
height: 100%;
`;

export const ContentWrapper = styled.View`
width: 80%;
color: ${Colors.brand};
padding: 20px 0;
text-align: center;
`;



// CARD AVANKARI
export const Card = styled.View`
width: 240px;
height: 350px;
margin-top: 50px;
margin-bottom: 20px;
backgroundColor: ${Colors.secondary};
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 60%;
  margin-bottom: 10px;
`;

export const TextBoldStyle = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  font-family: ${CustomFont};
  margin-left: 10px;
  color: ${Colors.tertiary};
  text-shadow: 2px 2px 5px ${Colors.darkLight};
`;

export const TextNormalStyle = styled.Text`
    fontSize: 14px;
    margin-bottom: 5px;
    font-family: ${CustomFont};
    margin-left: 10px;
    color: ${Colors.tertiary};
`;


