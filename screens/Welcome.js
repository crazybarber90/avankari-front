import { StatusBar } from 'expo-status-bar';
import React, { useState , useEffect, useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
} from '../components/styles';


const Welcome = ({ navigation, route }) => {
  const [backPressCount, setBackPressCount] = useState(0);
  const { name, email, picture, photo } = route.params;

  //=================================== REMOVING BACK ARROW FROM WELCOME PAGE
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null, // This will remove the back arrow
    });
  }, [navigation]);

  //=================================== DEVICE'S BACK DOESN'T WORK, IF PRESS X2, EXIT FROM APP
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Onemogućite funkcionalnost "back" dugmeta samo ako ste na ekranu za prijavljivanje
      if (navigation.isFocused()) {
        if (backPressCount === 1) {
          BackHandler.exitApp(); // Izlaz iz aplikacije ako se pritisne dva puta "back" dugme
          return true;
        }
        setBackPressCount(1);
        setTimeout(() => setBackPressCount(0), 2000); // Resetovanje broja pritisaka nakon 2 sekunde
        return true; // Vratite true da biste rekli sistemu da ste obradili pritisak na "back" dugme
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation, backPressCount]);
  
const logoutUser = async () => {
   AsyncStorage.removeItem('@token');
  navigation.navigate('Login')
}

const avatarSource = photo ? { uri: photo } : picture ? { uri: picture } : { uri: 'https://i.ibb.co/4pDNDk1/avatar.png' }

  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"

          source={avatarSource}
          // source={picture ? { uri: picture } : { uri: 'https://i.ibb.co/4pDNDk1/avatar.png' }}
          // source={route?.params?.photo ? { uri: route?.params?.photo } : { uri: 'https://i.ibb.co/4pDNDk1/avatar.png' }}
        />

        <WelcomeContainer>
          <PageTitle welcome={true}>WELCOME TO AVANKARI</PageTitle>
          <SubTitle welcome={true}>{name || 'Nikola Petrovic'}</SubTitle>
          <SubTitle welcome={true}>{email || 'pepy90aa@gmail.com'}</SubTitle>

          <StyledFormArea>
            {/* SEPARATOR */}
            <Line />

            {/* LOGOUT BUTTON */}
            <StyledButton onPress={logoutUser}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
