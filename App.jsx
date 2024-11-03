/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//#region import
import React from 'react';
import {Text} from 'react-native';

//react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
//localfiles
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/auth/Login';
import Reg from './src/screens/auth/Reg';
import Home from './src/screens/home/Home';
//#endregion

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{title: 'Splash'}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Reg" component={Reg} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
