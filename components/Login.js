import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput,ActivityIndicator ,Button, TouchableNativeFeedback, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from './CustomButton';
import LogoText from './LogoText';
import Colors from '../constants/Colors';
import Urls from '../constants/Urls';

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [logg, setLogg] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const validation =  () =>{
    if (username.length &&  password.length >= 8 ){
      return true;
    }
    else {
      let errmsg;
      if (username.length <= 0 ){
        errmsg='No Username '
      }

      else if (password.length <= 8) {
        errmsg='password should be at least 8 digits'
      }
      
      Alert.alert(
        "Error",
        errmsg,
        [
         
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      setLoading(false);
      return false
    }
  }
  // const 
  /**
   * This function handler the login request and validation
   */
  
  const loginHandler = () => {
    setLoading(true);
    // TODO: change true to validation()
    if (validation()) {
      fetch(Urls.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username_or_email: username, password: password })
      })
        .then(res => {
          console.log(res.status)
          setLoading(false);
          if (res.status === 200) {
            return res.json();

          }
          console.log('the token is invalid')
          failedAuthHandler();

        }).then((res) => {
          saveData(res.token);
          getData();
          props.navigate('Home');
          console.log('hello world')
        })
        .catch(error => console.log(error));
    }
    else {
      // Alert.alert('Error', 'Invaild Username or Password')
    }
  }
  const saveData = async (token) => {
    await AsyncStorage.setItem('MR_Token', token)

  }



  const getData = async (props) => {
    const token = await AsyncStorage.getItem('MR_Token');
    console.log('saved correctly', token)
    console.log('Before')
    if (token) {
      console.log('After')

    }
    setLogg(true);
    props.navigate('Home')
  }






  return (
    <View style={styles.screen}>
      <LogoText />
      <View style={styles.screenNameContainer}>
        <Text style={styles.nameScreenText}>Login</Text>
      </View>
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Username or Email" onChangeText={(text) => { setUsername(text) }} value={username} />

      <TextInput autoCapitalize='none' style={styles.input} placeholder="Password" onChangeText={(pass) => { setPasword(pass) }} value={password} secureTextEntry={true} />

      <View style={styles.buttonContainer}>
      {loading ? <ActivityIndicator size='large' color={Colors.blue} /> : <CustomButton style={{backgroundColor:Colors.primay, borderRadius:4}}  title='Login' onPress={loginHandler} />}
      </View>
      <View>
        {/* <Text>Don't have an account? <Text style={{color:Colors.blue}}>Register</Text></Text> */}
        <Text>Don't have an account? <TouchableNativeFeedback onPress={() => props.toggle()}><Text style={{ color: Colors.blue }}>Register</Text></TouchableNativeFeedback> </Text>
        <Text>Trouble in logging  <TouchableNativeFeedback onPress={() => props.navigate('Forgot')}><Text style={{ color: Colors.blue }}>forgot password? </Text></TouchableNativeFeedback> </Text>

      </View>
    </View>)
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenNameContainer: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    // alignItems:'flex-start',

  },
  nameScreenText: {
    textAlign: 'left',

    fontSize: 25,

  },

  input: {
    width: '80%',
    padding: 5,
    margin: 3,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  inputButton: {
    marginTop: 10,
    width: '100%'

  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  }
})

export default Login;