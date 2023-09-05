import axios from 'axios';

export const verifyEmail = async (otp, userId) => {

    try {
        const { data } = await axios.post('http://192.168.0.13:4000/api/users/verify-email', { otp, userId });
        return data
    } catch (error) {
        // return console.log(error)
        console.log("Error in verifyEmail:", error); // Koristi console.error umesto console.log kako bi istakli grešku
        // throw error;
    }
}
