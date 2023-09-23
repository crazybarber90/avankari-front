import styled from 'styled-components/native';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
//color
export const Colors = {
  primary: '#ffffff',
  secondary: '#e5e7eb',
  tertiary: '#1F2937',
  darkLight: '#9ca3af',

  // ovo je globalna boja
  brand: "#399BA6",
  // brand: '#6d28d9',

  // ovo je boja za search komponentu
  search: "#42BA9F",
  // search: "#a0235c",

  green: '#10b981',
  red: '#ef4444',
  googleButton: "#019E87"
};

const { primary, secondary, tertiary, darkLight, brand, green, red, googleButton } = Colors;


// ===========FONTOVI=========== // 
//==========================================================================
//u RootStack se uvoze fontofi koji mora da se DL u assets/fonts
// Onda se ovde samo upise drugo ime fonta i primenjuje se svuda

// DEFAULTNI FONT
// const CustomFont = Platform.OS === 'ios' ? 'System' : 'sans-serif';
// export const CustomFont = 'Pattaya';
export const CustomFont = 'NanumMyeongjo';
// export const CustomFont = 'Orbitron';
//==========================================================================

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  padding-bottom: 100px;
  background-color: ${primary};
`;
export const StyledContainerHome = styled.View`
  flex: 1;
  padding: 10px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};

`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const WelcomeImage = styled.Image`
  height: 40%;
  min-width: 100%;
  object-fit: cover;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-family: ${CustomFont};
  color: ${brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
   font-size: 35px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  color: ${tertiary};
  font-family: ${CustomFont};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
  `}
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;
export const StyledFormAreaSocial = styled.View`
  width: 95%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;


export const StyledTextInputWithImage = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${secondary};
  padding: 5px;
  border-radius: 5px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledTextInputSocial = styled.TextInput`
  background-color: ${secondary};
  padding: 5px;
  padding-left: 55px;
  padding-right: 25px;
  border-radius: 5px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
  overflow: hidden;
  font-family: ${CustomFont};
`;

export const StyledTableInputSocial = styled.TextInput`
  background-color: transparent;
  padding-left: 15px;
  padding-right: 25px;
  border-radius: 5px;
  height: 20px;
  font-size: 16px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
  text-transform: uppercase;
  margin-top:10px;
  font-family: ${CustomFont};


`;

export const StyledImage = styled.Image`
  opacity:0.8;
  width: 17%;
  height: 80%;
  margin-right: 15px; /* Opciono, dodaje malo prostora između slike i teksta */
`;


export const SyledSelectPicker = styled.View`
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
  display: flex;
`

export const StyledPickerLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
  font-family: ${CustomFont};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
  font-family: ${CustomFont};
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 33px;
  position: absolute;
  z-index: 1;
`;
export const LeftIconSocial = styled.View`
  left: 10px;
  top: 31px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;

  ${(props) =>
    props.google == true &&
    `
    background-color: ${googleButton};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const StyledButtonTable = styled.TouchableOpacity`
  padding: 6px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 45px;

  ${(props) =>
    props.google == true &&
    `
    background-color: ${googleButton};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const LogoutButton = styled.TouchableOpacity`
padding: 5px;
background-color: ${brand};
border-radius: 5px;
margin-vertical: 5px;
height: 45px;
width: 55px;
`

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  font-family: ${CustomFont};
  ${(props) =>
    props.google == true &&
    `
    margin-horizontal: 25px;
  `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  font-family: ${CustomFont};
  color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

export const MsgBox2 = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: ${CustomFont};
  color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary};
  font-size: 15px;
  font-family: ${CustomFont};
`;

export const TextLink = styled.TouchableOpacity`
  jsutify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
  margin-horizontal: 5px;
  font-family: ${CustomFont};
`;

export const ProfileTextContainer = styled.View`
  margin-bottom: 75px;
  margin-top: 5px;

`;

export const ProfileText = styled.Text`
  color: ${brand};
  font-size: 22px;
  margin-horizontal: 5px;
  border: 1px solid ${brand};
  padding: 5px;
  margin-bottom: 10px;
  font-family: ${CustomFont};
  
`;

