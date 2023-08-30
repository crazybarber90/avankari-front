import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreenComponent = ({ navigation }) => {
  useEffect(() => {
    // Prevent the native splash screen from auto-hiding
    // SplashScreen.preventAutoHideAsync();

    // Check token existence and navigate accordingly
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem('@token');
      const user = await AsyncStorage.getItem('@user');
      const parsedUser = JSON.parse(user);
      if( token ) {
        if (parsedUser.photo) {
          // rename name of picture to photo
            const newUser = { ...parsedUser, picture: parsedUser.photo };
            delete newUser.picture; 

            navigation.navigate('Welcome',newUser);
            }else {
                navigation.navigate('Welcome',parsedUser.data);
          }
        }
        else {
        await navigation.navigate('Login');
      }
    };

    checkTokenAndNavigate();
  }, [navigation]);


//DELETING TOKEN / SESSION FROM ASYNC STORAGE ===================

  // useEffect(()=> {
  //   clearAsyncStorage();
  // },[])

  // async function clearAsyncStorage() {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage cleared');
  //   } catch (error) {
  //     console.error('Error clearing AsyncStorage:', error);
  //   }
  // }
  // ============================================================

  return (
    // OVDE TREBA STAVITI SPLASH SCREENNNNNNNNNNNN <============================================///
    <View style={styles.container}>
      <Image source={require('./../assets/img/ja.jpg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreenComponent;
