//#region import
import {Dimensions, Text, SafeAreaView, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
const {height, width} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
//basecomp
import BtnApp from '../../components/baseComponents/BtnApp';
import TextInputFieldWithLabel from '../../components/baseComponents/TextInputFieldWithLabel';
//#endregion

//#region Main
export default function Login({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLoginBtnClick = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email ') {
          console.log('That email address is invalid!');
        }
        if (error.code === 'auth/user-disabled') {
          console.log('User is diabled');
        }
        if (error.code === 'auth/user-not-found') {
          console.log('User is diabled');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('Password is wrong');
        }
        console.error(error);
      });
  };
  const onRegBtnClick = () => {
    navigation.navigate('Reg');
  };
  return (
    <SafeAreaView flex={1} backgroundColor={'pink'}>
      <View
        flex={1}
        style={{paddingHorizontal: 16, paddingTop: '40%', gap: 16}}
        backgroundColor={'blue'}>
        <TextInputFieldWithLabel
          marginBottom={0}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInputFieldWithLabel
          marginBottom={0}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <BtnApp title="Login" marginVertical={16} onPress={onLoginBtnClick} />
        <Text
          style={{textAlign: 'center', fontSize: 20, color: 'red'}}
          onPress={onRegBtnClick}>
          Register user
        </Text>
      </View>
    </SafeAreaView>
  );
}
//#endregion
