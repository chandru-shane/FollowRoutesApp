import React, {useState} from 'react';
import { View, Text,StyleSheet, TextInput, Button, TouchableNativeFeedback, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoText from './LogoText';
import Colors from '../constants/Colors';

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [logg, setLogg]=useState(false);
  const [passwordError, setPasswordError]=useState(false);
  const move = async() =>{
    const token = await AsyncStorage.getItem("MR_Token")
    if(token){
      props.navigate('Home')
    }
  }
  
  /**
   * This function handler the login request and validation
   */
  const loginHandler = () => {
    
    if ((username.length)>=1 || (password.length)>=4){
      fetch(`http://192.168.43.242:8000/api/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username_or_email:username, password:password})
      })
      .then( res => {
          console.log(res.status)
          if(res.status===200){
            return res.json();
           
          }
          console.log('the token is invalid')
          failedAuthHandler();
          
      }).then((res)=>{
        saveData(res.token);
          getData();
          props.navigate('Home');
          console.log('hello world')
      })
      .catch( error => console.log(error));
    }
    else{
     Alert.alert('Error', 'Invaild Username or Password')
    }
  }
  const saveData = async (token) => {
    await AsyncStorage.setItem('MR_Token', token)
    
  }

  

  const getData = async (props) => {
    const token = await AsyncStorage.getItem('MR_Token');
    console.log('saved correctly', token)
    console.log('Before')
    if(token){
      console.log('After')
      
    }
    setLogg(true);
    props.navigate('Home')
  }


  const removeData = async () => {
    console.log('this reavoed')
    await AsyncStorage.removeItem('MR_Token')
    
  }



  return (
    <View style={styles.screen}>
      <LogoText />
      <View style={styles.screenNameContainer}>
      <Text style={styles.nameScreenText}>Login</Text>
      </View>
      <TextInput  autoCapitalize='none' style={styles.input} placeholder="Username or Email" onChangeText={(text)=>{setUsername(text)}} value={username} />
      
      <TextInput autoCapitalize='none' style={styles.input} placeholder="Password" onChangeText={(pass)=>{setPasword(pass)}} value={password} secureTextEntry={true} />
     
      <View style={styles.buttonContainer}>
      <Button color={Colors.primay} title='Login' onPress={()=>{loginHandler()}} />
      </View>
      <View>
        {/* <Text>Don't have an account? <Text style={{color:Colors.blue}}>Register</Text></Text> */}
        <Text>Don't have an account? <TouchableNativeFeedback onPress={()=>props.toggle()}><Text style={{color:Colors.blue}}>Register</Text></TouchableNativeFeedback> </Text>
        
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