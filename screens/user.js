import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Alert, ScrollView,FlatList} from 'react-native';
import Logout from '../components/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Urls from '../constants/Urls';
import CardBox from '../components/CardBox';




const UserScreen = props => {
  const [profileData, setProfileData] = useState();
  const [tripData, setTripData] = useState();

  const removeKey = async () => {
    try {
      await AsyncStorage.removeItem("MR_Token");
    }
    catch (error) {
      console.log(error);
    }
  }
  
  
  const getUserData = async () => {
    const token = await AsyncStorage.getItem("MR_Token");
    console.log("getting the home data", token)
    try{
      if (token) {
        fetch(`${Urls.GET_USER_NAME}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
  
        }).then(res => {
          if (res.status === 200) {
            console.log("This we get data fine", res)
            
            return res.json();
          }
          else {
            removeKey();
            console.log('is am going to exit')
            props.navigation.navigate("Auth");
          }
        }).then(res => {
          setProfileData(res);
          console.log(res)          
          return res
          
        }).catch((err) => {
          console.log(err)
          Alert.alert('Error', 'Network Error', ['Okay'])
        })
      }
    }
    catch(error){
      console.log('thisis from allert fule')
      Alert.alert('Error', 'Network Error New', ['Okay'])
    }
  }


  
  
  const getTripData = async () =>{

    const token = await AsyncStorage.getItem("MR_Token");
    console.log("getting the home data", token)
    try{
      if (token) {
        fetch(`${Urls.USER_TRIPS}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
  
        }).then(res => {
          if (res.status === 200) {
            console.log("This we get data fine", res)
            return res.json();
          }
          else {
            removeKey();
            console.log('is am going to exit')
            props.navigation.navigate("Auth");
          }
        }).then(res => {
          console.log('printing data', res);
          setTripData(res)
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
  

  useEffect(()=>{
    getTripData()
     getUserData()

    console.log(profileData)
  },[])
  
  return (
    <ScrollView >
      <View style={styles.screen}>
    <View style={styles.profileContainer}>
      <View style={styles.profileImageContainer}>
       {profileData && <Image style={styles.profileImage} source={{uri:profileData.image}}/>}
      </View>
      {profileData &&  <Text style={styles.displayNameText}>@{profileData.display_name}</Text> }
      {profileData &&  <Text style={styles.bioText}>{profileData.bio}</Text> }
      <View style={styles.userDetail}>
      {profileData && <Text style={styles.detailText}>{profileData.trips} Trips</Text>}
      {profileData && <Text style={styles.detailText}>{profileData.following} Following</Text>}
      {profileData && <Text style={styles.detailText}>{profileData.followers} Followers</Text>}
      </View>
      
     
    </View>

   
    <View>
    <FlatList 
        style={styles.mainList}
          data={tripData}
          keyExtractor={(item, index) => item.id}
          renderItem={(itemData) => {
            console.log(itemData.item, 'consoling from user data');
            return (<CardBox
              title={itemData.item.name}
              cost={itemData.item.cost}
              description={itemData.item.description}
              day={itemData.item.day}
              thumbnail={itemData.item.thumbnail}
              onSelect={() => { props.navigation.navigate({ routeName: 'Detail', params: { item: itemData.item, title: itemData.item.name, username:itemData.item.user_displayname } }) }}
            />)
          }}
        />
    </View>
  </View>
  </ScrollView>
  );
}


UserScreen.navigationOptions= navData => {
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
    ),
    headerRight:<Logout navigation={navData.navigation}/>
  }
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    // justifyContent:'center',
    // alignItems:'center'
  },
  profileContainer:{
    width:'100%',
    // height:'50%',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },
  profileImage:{
    width:100,
    height:100,
    borderRadius:300,
  },
  displayNameText:{
    fontWeight:'bold',
  },
  userDetail:{
    flexDirection:'row'
  },
  detailText:{
    fontWeight:'bold',
    margin:10,
  },
  mainList: {
    width: '100%',
    padding: 10,

  }
})

export default UserScreen;