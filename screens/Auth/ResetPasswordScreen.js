import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Urls from '../../constants/Urls';

const ResetPasswordScreen = props => {

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const code = props.navigation.getParam('code');
    
    // invalid password -> 400 bad request 
    // invalid code -> 404 
    // fine password reset done -> 200

    const postChangePassword = async () => {
        if (password!= confirmPassword){
            Alert.alert("Password Not Match","",["Okay"])
            return ;
        }
        try {
            await fetch(Urls.CONFIRM_PASSWORD_RESET, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: password, token: code })
            }).then((res) => {
                if(res.status === 400){
                    Alert.alert("Invalid Password", "Try some strong password", ["Okay"]);
                }
                else if (res.status === 200){
                    Alert.alert("Success", "Done!", ["Okay"])
                }
                else {
                    Alert.alert("Something went worng", "Try again! or Try later", ["okay"])
                }
            })
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'something went worng try again later', ['Okay'])
        }
    }

    return (
        <View style={styles.screen}>
            <TextInput
             autoCapitalize='none' 
             style={styles.input}
             value={password}
             placeholder="password"
             onChangeText={setPassword} />

            <TextInput 
            autoCapitalize='none' 
            style={styles.input}
            placeholder="confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword} />

            <CustomButton title="Confirm" onPress={postChangePassword} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        padding: 5,
        margin: 3,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
      },
})

export default ResetPasswordScreen;