import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Urls from '../constants/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';


const User = props => {
  const logoutRequest = async () => {
    const token = await AsyncStorage.getItem("MR_Token")

    if (token) {
      fetch(`${Urls.LOGOUT}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then(res => {
          const statusCode = res.status
          if (statusCode === 200) {
            console.log('this is the status code of the request', statusCode)
            return res.json()
          }

        })
        .then(jsonRes => {
          console.log(jsonRes);
          if (jsonRes.detail === "Invalid token.") {
            props.authHandler()
          }
          setHomeData(jsonRes);


        })
        .catch(error => {
          console.log(error, 'falieing')
        });
    }
    else {
      props.navigation.navigate("Auth");
    }
  }

  const logoutHandler = navigate => {
    logoutRequest();
    navigate("Auth");
  }
  return (<View style={styles.screen}><Text>This is hello world</Text>
    <Button title='logout' onPress={() => logoutHandler(props.navigation.navigate)} /></View>)
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default User;