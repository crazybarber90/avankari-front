import React, { useState, useEffect } from 'react';
// REACT NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// SCREENS
import Login from '../Login';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import Signup from '../Signup';
import Welcome from '../Welcome';
import SplashScreen from '../SplashScreen';
import Verification from '../Verification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchList from '../Search/SearchList';
import { UserProfile } from '../BottomNavigation';
import SearchItem from '../Search/SearchItem';
import SingleAvankari from '../Search/SingleAvankari';
// import * as Font from 'expo-font';
import { useFonts } from 'expo-font';


// COLORS
import { Colors } from '../../components/styles';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../redux/features/auth/authSlice';
const { primary, tertiary } = Colors;

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useDispatch()

  const [fontsLoaded] = useFonts({
    NanumMyeongjo: require('../../assets/fonts/NanumMyeongjo.ttf'),
    Orbitron: require('../../assets/fonts/Orbitron.ttf'),
    Pattaya: require('../../assets/fonts/Pattaya.ttf'),
    Arimo_normal: require('../../assets/fonts/Arimo.ttf'),
    Cinzel: require('../../assets/fonts/Cinzel.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="SplashScreen"
      // initialRouteName="SearchItem"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen options={{ headerTintColor: primary }} name="Welcome" component={Welcome} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="SearchList" component={SearchList} />
        <Stack.Screen name="SearchItem" component={SearchItem} />
        <Stack.Screen name="SingleAvankari" component={SingleAvankari} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
