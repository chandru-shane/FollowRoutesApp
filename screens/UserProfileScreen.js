import React, {useEffect, useState, useCallback} from 'react';
import {View, 
      Text, 
      StyleSheet, 
      ScrollView,
       FlatList, 
       Image, 
       RefreshControl,
       TouchableOpacity,
       Alert
      } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../constants/Urls';
import CardBox from '../components/CardBox';
import CustomButton from '../components/CustomButton';

const UserProfileScreen = props => {

  const data = props.navigation.getParam('userData') 

  const [tripData, setTripData] = useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const [status, setStatus] = useState(data.follow_status);
  const  [trips, setTrips] = useState(data.trips)
  const  [following, setFollowing] = useState(data.following)
  const  [followers, setFollowers] = useState(data.followers)



  const removeKey = async () => {
    try {
      await AsyncStorage.removeItem("MR_Token");
    }
    catch (error) {
      console.log(error);
    }
  }
  

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getUserDetail()
    getTripData();
    setRefreshing(false)
    
  }, [refreshing]);
  

  const getUserDetail = async () => {
    const token = await AsyncStorage.getItem("MR_Token");
    try{
      if (token) {
        await fetch(`${Urls.USER_PROFILE}${data.username}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
  
        }).then(res => {
          console.log(res)
          if (res.status === 200) {
            console.log("This we get data fine", res)
            return res.json();
          }
          else {
            // removeKey();
            console.log('is am going to exit')
            // props.navigation.navigate("Auth");
          }
        }).then(res => {
          setFollowers(res.followers);
          setFollowing(res.following)
          setTrips(res.trips)
          setStatus(res.follow_status)
          
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
  
  const getTripData = async () =>{
    
    const token = await AsyncStorage.getItem("MR_Token");
    console.log("getting the home data", token)
    try{
      if (token) {
        fetch(`${Urls.GET_TRIP_BY_USERNAME}${data.username}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
  
        }).then(res => {
          if (res.status === 200) {
            return res.json();
          }
          else {
            removeKey();
            props.navigation.navigate("Auth");
          }
        }).then(res => {
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
    getUserDetail()
    getTripData()
  },[data.username])



  useEffect(()=>{
    getUserDetail()
  },[status])

  

  const followHandler = async () => {

    const token = await AsyncStorage.getItem("MR_Token");
    console.log("getting the home data", token)
    try{
      if (token) {
        await fetch(`${Urls.FOLLOW}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({username:data.username})
  
        }).then((res) => {
          if (res.status === 201){
            
            setStatus(true);
          }
          else if (res.status === 200){
            setStatus(false)
          }
          return res.json()
        })}
      }
        catch(error){
            console.log(error)
        }

    
  }
  return (
    <View>
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
  
      <View style={styles.screen}>
    <View style={styles.profileContainer}>
      <View style={styles.profileImageContainer}>
       <Image style={styles.profileImage} source={{uri:data.userprofile_image}}/>
      </View>
      
      <Text style={styles.displayNameText}>@{data.user_displayname}</Text>
      <View style={styles.userFollowContainer}>
        
      <CustomButton style={styles.donateButton} title="Contribute" 
              onPress={()=>{}}/>

      <CustomButton style={styles.followButton} title={status ? "Following": "Follow"} 
              onPress={followHandler}/>
      </View>
       <Text style={styles.bioText}>{data.bio}</Text> 
      <View style={styles.userDetail}>
      <Text style={styles.detailText}>{trips} Trips</Text>
      <TouchableOpacity onPress={()=>{props.navigation.navigate({routeName:'Followers', params:{otheruser:true, username: data.username}})}}>
                <Text style={styles.detailText}>{followers} Followers</Text>
              </TouchableOpacity>
      
              <TouchableOpacity onPress={()=>{props.navigation.navigate({routeName:'Following', params:{otheruser:true, username: data.username}})}}>
                <Text style={styles.detailText}>{following} Following</Text>
              </TouchableOpacity>
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
   </View>
  );
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
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
      marginHorizontal:3
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
    },
    userFollowContainer:{
      flexDirection:'row',
        alignItems:'center',
        
    },
    followButton:{
      marginHorizontal:3,
    },
    donateButton: {
      marginHorizontal:3,
      backgroundColor:'red'
    }

})


export default UserProfileScreen;