//#region import
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
//baseComp
import CustomLoader from '../components/baseComponents/CustomLoader';
//assets
const splash = require('../assets/images/splash.png');
//#endregion

//#region Main
export default function SplashScreen({navigation, route}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log('onAuthStateChanged user = ', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (initializing) return;
    const timeoutId = setTimeout(() => {
      if (user) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [initializing]);

  return (
    <SafeAreaView>
      <ImageBackground
        source={splash}
        resizeMode="cover"
        style={{height: '100%', width: 'auto', justifyContent: 'center'}}>
        <CustomLoader color={'red'} isSmall={true} />
      </ImageBackground>
    </SafeAreaView>
  );
}
//#endregion
