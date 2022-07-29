import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    console.log('aca')
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

async function GetFCMToken(){
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log("🚀 ~ file: pushnotification_helper.js ~ line 18 ~ GetFCMToken ~ fcmtoken", fcmtoken)
    
    if(!fcmtoken){
        try {
            let fcmtoken = messaging().getToken();
            
            if(fcmtoken){
                AsyncStorage.setItem("fcmtoken",fcmtoken);
            }else{

            }
        }catch(error){
            console.log(error)
        }
    }
}