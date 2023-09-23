import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler, View, Text, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../redux/features/auth/authSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// EXPO ICONS 
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
//BOTTOM TAB COMPONENTS
import {
  Home,
  UserProfile,
  Search,
  Settings,
  AboutApp
} from './BottomNavigation';
const Tab = createBottomTabNavigator()

import {
  CustomFont,
  Colors,
} from '../components/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/features/auth/authSlice';

const { brand, darkLight, primary, tertiary } = Colors;
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    // display: "flex",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

const Welcome = ({ navigation, route }) => {
  const [backPressCount, setBackPressCount] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // const [backPressCount, setBackPressCount] = useState(0);
  // const { name, email, picture, photo } = route.params;
  // const user = useSelector(selectUser)
  // const { name, email, picture, photo } = user;


  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const userString = await AsyncStorage.getItem('@user');
  //       if (userString) {
  //         const user = JSON.parse(userString);
  //         // await (setCurrentUser(user));
  //       }
  //     } catch (error) {
  //       console.error('Error loading user from AsyncStorage:', error);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // Ova funkcija će se pozvati kada tastatura bude vidljiva
  const keyboardDidShow = () => {
    setIsKeyboardVisible(true);
  };

  // Ova funkcija će se pozvati kada tastatura bude sakrivena
  const keyboardDidHide = () => {
    setIsKeyboardVisible(false);
  };

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

    // Dodajemo event listenere za tastaturu
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    // Čistimo event listenere kada se komponenta unmount-uje
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');

    };
  }, [navigation, backPressCount]);

  // console.log("OVO JE USER IZ REDUXA", userIzReduxa)


  return (
    <>
      <StatusBar style="dark" hidden={isKeyboardVisible} />
      {/*---------------------- BOTTTOM TABS NAVIGATION -------------------- */}
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}

      >
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="Home"
            component={Home}
            initialParams={route.params}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="home" size={24} color={focused ? tertiary : darkLight} />
                    <Text style={{ fontSize: 12, color: brand, fontFamily: CustomFont }}>HOME</Text>
                  </View>
                )
              }
            }
            } />
          <Tab.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <FontAwesome5 name="user-edit" size={24} color={focused ? brand : darkLight} />
                    <Text style={{ fontSize: 12, color: brand, fontFamily: CustomFont }} >PROFILE</Text>
                  </View>
                )
              }
            }
            } />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: brand,
                    width: Platform.OS == "ios" ? 70 : 80,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? 0 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                    elevation: 10,
                  }}>
                    <FontAwesome name="search" size={24} color={focused ? primary : darkLight} style={{ transform: [{ translateY: 6 }] }} />
                    <Text style={{ fontSize: 12, color: "red" }} />
                  </View>
                )
              }
            }
            } />

          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="ios-settings" size={24} color={focused ? brand : darkLight} />
                    <Text style={{ fontSize: 12, color: brand, fontFamily: CustomFont }} >SETINGS</Text>
                  </View>
                )
              }
            }
            } />
          <Tab.Screen
            name="AboutApp"
            component={AboutApp}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="book-sharp" size={24} color={focused ? brand : darkLight} />
                    <Text style={{ fontSize: 12, color: brand, fontFamily: CustomFont }} >ABOUT</Text>
                  </View>
                )
              }
            }
            } />
        </Tab.Navigator>
      </KeyboardAvoidingView>
    </>
  );
};

export default Welcome;
