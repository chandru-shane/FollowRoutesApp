import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button,  TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoText from '../components/LogoText';
import Login from '../components/Login';
import Register from '../components/Register';


const MainAuth = props => {
    const [reg, setReg] = useState(false);
    const [log , setLog] = useState(false);
    
    const isLoggedin = async () => {
        const token = await AsyncStorage.getItem("MR_Token");
        console.log("This is really working", token)
        if(token){
            setLog(true);
            console.log('we are getting there')
            props.navigation.navigate('Home');
        }
        
    }

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus', isLoggedin);

        return () => {
            willFocusSub.remove();
        }
    },[])
    
    useEffect(()=>{
        isLoggedin();
        console.log('this is printing new')
    },[])
    /**
     * this function toggle between login view and register view
     */
    const toggleView = () => {
        setReg(!reg);
    }
    let authView = <Login  toggle={toggleView} navigate={props.navigation.navigate} />
    
    if (reg){
        authView = <Register toggle={toggleView} />
    }
   
    return (authView)
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

export default MainAuth;