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
export default function Reg({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onRegBtnClick = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
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
        <BtnApp title="Reg" marginVertical={16} onPress={onRegBtnClick} />
      </View>
    </SafeAreaView>
  );
}
//#endregion
