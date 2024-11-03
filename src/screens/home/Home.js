//#region import
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//base comp
import BtnApp from '../../components/baseComponents/BtnApp';
import Category from '../../components/blockComponents/Category';
import FoodCard from '../../components/blockComponents/FoodCard';
import CustomLoader from '../../components/baseComponents/CustomLoader';
//#endregion

//#region Main
export default function Home({navigation, route}) {
  //#region Main
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [categories, setCategories] = useState([]); // Initial empty array of users
  const [foods, setFoods] = useState([]); // Initial empty array of users
  //#endregion

  // console.log('================categories====================');
  // console.log(JSON.stringify(categories, null, 3));
  // console.log('====================================');

  //#region firestore
  const getFoodData = async () => {
    const foodData = await firestore()
      .collection('foods')
      .doc('3q8hfMxNeHCgNw8Q2pSq')
      .get();
    console.log('foodData = ', foodData['_data']);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(querySnapshot => {
        const arrTmp = [];
        querySnapshot.forEach(documentSnapshot => {
          arrTmp.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCategories(arrTmp);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  useEffect(() => {
    const subscriber = firestore()
      .collection('foods')
      .onSnapshot(querySnapshot => {
        const arrTmp = [];
        querySnapshot.forEach(documentSnapshot => {
          arrTmp.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setFoods(arrTmp);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  //#endregion

  //#region action
  const testUpdate = () => {};
  const onBtnLogoutClick = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login');
      });
  };
  //#endregion

  if (loading) {
    return <CustomLoader color={'red'} />;
  }

  return (
    <SafeAreaView flex={1}>
      <View style={{flex: 1}}>
        <Text
          style={{
            marginBottom: 7,
            marginLeft: 21,
            fontSize: 19,
          }}>
          Choose the
        </Text>
        <Text boldy style={styles.text}>
          Food You Love
        </Text>
        <Search />
        <Text style={styles.text}>Catogries</Text>
        <Button
          title="Add Category Or Foods"
          onPress={() => navigation.navigate('AddFoodOrCategory')}
        />
        <Button title="test update" onPress={testUpdate} />
        <View style={{height: 150}}>
          <FlatList
            horizontal
            data={categories}
            renderItem={({item}) => (
              <Category
                title={item.title}
                itemKey={item.key}
                image={{uri: item.imageURL}}
              />
            )}
          />
        </View>
        <Text style={styles.text}>Main Dishes</Text>
        <FlatList
          horizontal
          data={foods}
          renderItem={({item}) => (
            <FoodCard
              image={item.imageURL}
              title={item.title}
              price={item.price}
              itemKey={item.key}
            />
          )}
        />
        <BtnApp
          title="LOG OUT"
          marginVertical={16}
          onPress={onBtnLogoutClick}
        />
      </View>
    </SafeAreaView>
  );
}

function Search() {
  return (
    <View style={styles.conSch}>
      <TextInput style={{width: '100%'}} placeholder="Search for a food item" />
    </View>
  );
}
const styles = StyleSheet.create({
  con: {
    backgroundColor: '#f7f6ff',
  },
  text: {
    marginLeft: 21,
    fontSize: 19,
    marginBottom: 13,
  },
  conSch: {
    backgroundColor: 'white',
    height: 49,
    width: '88%',
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 13.5,
    marginBottom: 17,
  },
});
//#endregion
