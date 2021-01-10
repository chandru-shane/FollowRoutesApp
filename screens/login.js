import React from 'react';
import { View, Text,StyleSheet, TextInput, Button, TouchableNativeFeedback } from 'react-native';

import LogoText from '../components/logoText';
import Colors from '../constants/colors';


const Login = props => {
  return (
    <View style={styles.screen}>
      <LogoText />
      <View style={styles.screenNameContainer}>
      <Text style={styles.nameScreenText}>Login</Text>
      </View>
      <TextInput  autoCapitalize='none' style={styles.input} placeholder="Username or Email" />
      
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Password" secureTextEntry={true} />
     
      <View style={styles.buttonContainer}>
      <Button color={Colors.primay} title='Login' />
      </View>
      <View>
        {/* <Text>Don't have an account? <Text style={{color:Colors.blue}}>Register</Text></Text> */}
         <TouchableNativeFeedback onPress={()=>console.log('touched')}><Text style={{color:Colors.blue}}>Forget Password?</Text></TouchableNativeFeedback> 
        
      </View>
      <View>
        {/* <Text>Don't have an account? <Text style={{color:Colors.blue}}>Register</Text></Text> */}
        <Text>Don't have an account? <TouchableNativeFeedback onPress={()=>console.log('touched')}><Text style={{color:Colors.blue}}>Register</Text></TouchableNativeFeedback> </Text>
        
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

export default Login;