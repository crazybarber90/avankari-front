import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUser } from '../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
const SplashScreenComponent = ({ navigation }) => {

  // const user = useSelector(selectUser)
  useEffect(() => {
    // Prevent the native splash screen from auto-hiding
    // SplashScreen.preventAutoHideAsync();

    // Check token existence and navigate accordingly
    const checkTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem('@token');
      const user = await AsyncStorage.getItem('@user');
      const parsedUser = JSON.parse(user);
      if (token) {
        if (parsedUser.photo) {
          // rename name of picture to photo
          const newUser = { ...parsedUser, picture: parsedUser.photo };
          delete newUser.picture;
          // console.log("-----------ulazi u splash newUser", newUser)
          navigation.replace('Welcome', newUser);
        } else {
          // console.log(" -----------ulazi u splash parsed user data", parsedUser.data)
          navigation.replace('Welcome', parsedUser.data);
        }
      }
      else {
        // console.log("----------ne ulazi u splash")
        await navigation.replace('Login');
      }
      // console.log("U-S-E-R is splasha", user)
      // console.log("T-O-K-E-N is splasha", token)
    };

    checkTokenAndNavigate();
  }, [navigation]);


  //DELETING TOKEN / SESSION FROM ASYNC STORAGE ===================

  // useEffect(() => {
  //   clearAsyncStorage();
  // }, [])

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
      <Image source={require('./../assets/img/splashLik.png')} style={styles.image} />
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
    width: '50%',
    height: '50%',
    resizeMode: 'cover',
  },
});

export default SplashScreenComponent;
