import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../constants/Urls';
import UserBoxFollowersList from '../components/UserBoxFollowersList';

const UserFollowers = props => {
    const [userData, setUserData] = useState();
    const others = props.navigation.getParam('otheruser');
    const usernameData = props.navigation.getParam('username');
    console.log("skdfjsl fsflsdjfls jf+++++++++++++++ ++++++++++++++++++++ +++++++++++++", others, usernameData)
    const getFollowersUser = async () => {
        const token = await AsyncStorage.getItem("MR_Token");
        console.log("getting the home data", token)
        let url;
        if (others){
            url = `${Urls.FOLLOWERS}${usernameData}/`
            console.log(url)
        }
        else {
            url = `${Urls.FOLLOWERS}`
        }
        try {
            if (token) {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${token}`
                    }

                }).then(res => {
                    
                        console.log("This we get data fine", res)
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
            getFollowersUser();
        },[usernameData])


    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus', getFollowersUser)
        return () =>{
          willFocusSub.remove()
        }
      },[usernameData])

    return (
        <View style={styles.screen}>
            <UserBoxFollowersList data = {userData} navigation={props.navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1, 
        margin:1,
        // justifyContent:'center',
        // alignItems:'center'
    }
})

export default UserFollowers;