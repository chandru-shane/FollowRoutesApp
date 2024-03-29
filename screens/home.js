import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

import Urls from '../constants/Urls';
import CardBox from '../components/CardBox';
import HomeSearch from '../components/HomeSearch';

const Home = props => {
  const [homeData, setHomeData] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [refresh , setRefresh] = useState(false);

  const removeKey = async () => {
    try {
      await AsyncStorage.removeItem("MR_Token");
    }
    catch (error) {
      console.log(error);
    }
  }

  const getHomeData = async () => {
    setRefresh(true)
    const token = await AsyncStorage.getItem("MR_Token");
    console.log("getting the home data", token)
    try{
      if (token) {
        fetch(`${Urls.TOP}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
  
        }).then(res => {
          console.log(res);
          if (res.status === 200) {
            console.log("This we get data fine", res)
            setRefresh(false)
            return res.json();
          }
          else {
            removeKey();
            console.log('is am going to exit')
            props.navigation.navigate("Auth");
          }
        }).then(res => {
          console.log('printing data', res);
          setHomeData(res)
        }).catch(() => {
          Alert.alert('Error', 'Network Error', ['Okay'])
        })
      }
    }
    catch(error){
      console.log('thisis from allert fule')
      Alert.alert('Error', 'Network Error New', ['Okay'])
    }
  }


  const searchRequest = async (text, navigate = null) => {
    const token = await AsyncStorage.getItem("MR_Token")
    if(!text){
      return;
    }
    if (token) {
      fetch(`${Urls.SEARCH}${text}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then(res => {
          if (res.status !== 200) {
            console.log('something went worng')
            navigate('Auth')
          }
          return res.json()
        })
        .then(jsonRes => {
          setHomeData(jsonRes)
          console.log(jsonRes);

        })
        .catch(error => console.log(error, 'faling'));
    }
    else {
      props.navigation.navigate("Auth");
    }

  }
  const SearchHandler = (text, navigate = null) => {
    searchRequest(text, navigate);
  }

  useEffect(() => {
    getHomeData();

  }, [])

  useEffect(()=>{
    const willFocusSub = props.navigation.addListener('willFocus', getHomeData)
    return () =>{
      willFocusSub.remove()
    }
  },[])

  return (

    <ScrollView style={styles.scrollView}>
      <View style={styles.screen}>
        <HomeSearch SearchHandler={SearchHandler} serach={props.navigation.navigate} />

        <FlatList 
        onRefresh = {getHomeData}
        refreshing={refresh}
        style={styles.mainList}
          data={homeData}
          keyExtractor={(item, index) => item.id}
          // keyExtractor={(item) => {
          //   console.log(typeof toString(item.id), 'printine teh key data')
          //   return toString(item.id)
          // }}
          renderItem={(itemData) => {
            console.log(itemData.item, 'consoling');
            return (<CardBox
              title={itemData.item.name}
              cost={itemData.item.cost}
              description={itemData.item.description}
              day={itemData.item.day}
              thumbnail={itemData.item.thumbnail}
              currency={itemData.item.currency}
              onSelect={() => { props.navigation.navigate({ routeName: 'Detail', params: { item: itemData.item, title: itemData.item.name, username:itemData.item.user_displayname } }) }}
            />)
          }}
        />

      </View>
     </ScrollView>


  )

}

Home.navigationOptions= navData => {
  return {
    headerTitle:'FollowRoutes',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: 'white'
  },
  screen: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: 'white',

  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    borderWidth: 1,
    borderColor: '#888',
    marginVertical: 20,
    marginTop: 25,
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'white',
    elevation: 5,

  },
  searchInput: {
    width: '80%',
    borderColor: '#888',
    alignItems: 'center',
    padding: 5,
    margin: 1,
  },
  searchIcon: {
    width: '20%',
    padding: 5,
    margin: 1,
  },
  mainList: {
    width: '100%',
    padding: 10,

  }

})


export default Home;