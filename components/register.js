import { setStatusBarStyle } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableNativeFeedback } from 'react-native';

import LogoText from './LogoText';
import Colors from '../constants/Colors';


const Register = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState(false);


  const registerHandler = () => {
    fetch(`http://192.168.43.242:8000/api/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(res => { if (res.status == 201) { props.toggle(); } return res.json() })
      .then((res) => {
        // TODO:Check the otehr condition for username email and password
        console.log(res);
        // console.log(res.username)
        console.log(res.password[0]);
        // if(res.password[0]){
        //    passwordMsg = <Text>"Ensure this field has at least 8 characters."</Text>;
        // }

      })
      .catch(error => console.log(error));
  }

  return (

    <View style={styles.screen}>
      <LogoText />
      <View style={styles.screenNameContainer}>
        <Text style={styles.nameScreenText}>Register</Text>
      </View>
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Username" onChangeText={(text) => { setUsername(text) }} value={username} />
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Password" onChangeText={(pass) => { setPasword(pass) }} value={password} secureTextEntry={true} />
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Confirm Password" onChangeText={(pass) => { setConfirmPassword(pass) }} value={confirmPassword} secureTextEntry={true} />
      <View style={styles.buttonContainer}>
        <Button color={Colors.primay} title='Register' onPress={() => { registerHandler() }} />
      </View>
      <View>
        <Text>Already have an account? <TouchableNativeFeedback onPress={() => props.toggle()}><Text style={{ color: Colors.blue }}>Login</Text></TouchableNativeFeedback> </Text>
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

export default Register;