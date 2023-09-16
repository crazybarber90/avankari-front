import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const handleGoogleSignup = async (data) => {

  const { authentication, userInfo } = data;
  const { accessToken } = authentication;
  const { name, email, photo } = userInfo;
  const credentials = {
    name,
    email,
    photo,
    accessToken,
  };

  const url = 'http://192.168.0.13:4000/api/users/googleSignUp';
  //  POVEZI TELEFON NA WIFI ISTI KAO I KOMP !!!!!!!
  try {
    const response = await axios.post(url, credentials, { withCredentials: true });

    // console.log("----------------------- ---------------- ---------------USER IS HANDLE-SIGN-UP GOOOOGGGLEEEEEEEEEEEE", response.data)

    // OVDE SE PUNI ASYNCSTORAGE IZ RESPONSA IZ BAZE ZA GOOGLESIGNUP
    await AsyncStorage.setItem('@token', response.data.token);
    await AsyncStorage.setItem('@user', JSON.stringify(response.data))

    return response.data;

  } catch (error) {
    console.error("Error in handleSignup:", error);
    throw error;
  }
};
