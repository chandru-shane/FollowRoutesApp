import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../constants/Urls';
import UserBoxFollowingList from '../components/UserBoxFollowingList';

const UserFollowing = props => {
    const [userData, setUserData] = useState();
    const others = props.navigation.getParam('otheruser');
    const usernameData = props.navigation.getParam('username');
    console.log("skdfjsl fsflsdjfls jf+++++++++++++++ ++++++++++++++++++++ +++++++++++++", others, usernameData)
    const getFollowingUser = async () => {
        const token = await AsyncStorage.getItem("MR_Token");
        console.log("getting the home data", token)
        let url;
        if (others){
            url = `${Urls.FOLLOWING}${usernameData}/`
            console.log(url)
        }
        else {
            url = `${Urls.FOLLOWING}`
        }
        try {
            if (token) {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    }

                }).then(res => {
                    if (res.status === 200) {
                        console.log("This we get data fine", res)
                        return res.json();
                    }
                    return res.json();

                }).then(res => {
                    setUserData(res);
                    console.log(res)
                    return res

                }).catch((err) => {
                    console.log(err)
                    Alert.alert('Error', 'Network Error', ['Okay'])
                })
            }
        }
        catch (error) {
            console.log('thisis from allert fule')
            Alert.alert('Error', 'Something Went Wrong', ['Okay'])
        }
    }
    
    
    useEffect(()=>{
        console.log('started the following screen')
        getFollowingUser();
    },[usernameData])

useEffect(()=>{
    const willFocusSub = props.navigation.addListener('willFocus', getFollowingUser)
    return () =>{
      willFocusSub.remove()
    }
  },[usernameData])
 
    return (
        <View style={styles.screen}>
           <UserBoxFollowingList data = {userData} navigation={props.navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1, 
        // justifyContent:'center',
        // alignItems:'center'
    }
})

export default UserFollowing;