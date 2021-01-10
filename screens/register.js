import React from 'react';
import { View, Text,StyleSheet, TextInput, Button, TouchableNativeFeedback } from 'react-native';

import LogoText from '../components/logoText';
import Colors from '../constants/colors';


const Register = props => {
  return (
    <View style={styles.screen}>
      <LogoText />
      <View style={styles.screenNameContainer}>
      <Text style={styles.nameScreenText}>Register</Text>
      </View>
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Username" />
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Email" />
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Password" secureTextEntry={true} />
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Confirm Password" secureTextEntry={true} />
      <View style={styles.buttonContainer}>
      <Button  color={Colors.primay} title='Register' />
      </View>
      <View>
        <Text>Already have an account? <TouchableNativeFeedback onPress={()=>console.log('touched')}><Text style={{color:Colors.blue}}>Login</Text></TouchableNativeFeedback> </Text>
      </View>
    </View>)
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenNameContainer:{
    flexDirection:'row',
    // justifyContent:'space-between',
    // alignItems:'flex-start',
    
  },
  nameScreenText:{
    textAlign:'left',

    fontSize:25,
    
  },

  input:{
    width:'80%',
    padding:5,
    margin:3,
    borderRadius:4,
    borderColor:'#ccc',
    borderWidth:1,
  },
  inputButton:{
    marginTop:10,
    width:'100%'

  },
  buttonContainer:{
    width:'80%',
    marginVertical:10,
    
  }
})

export default Register;