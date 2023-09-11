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

// COLORS
import { Colors } from '../../components/styles';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../redux/features/auth/authSlice';
const { primary, tertiary } = Colors;

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   console.log("OKINUTOOOOOOOO IZ ROOTSTACk")
  //   const fetchUserFromStorage = async () => {
  //     try {
  //       const userString = await AsyncStorage.getItem('@user');
  //       if (userString) {
  //         const user = await JSON.parse(userString);
  //         await dispatch(SET_USER(user));
  //       }
  //     } catch (error) {
  //       console.error('Error loading user from AsyncStorage:', error);
  //     }
  //   };

  //   fetchUserFromStorage();
  // }, [dispatch]);

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
      // initialRouteName="ResetPassword"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen options={{ headerTintColor: primary }} name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
