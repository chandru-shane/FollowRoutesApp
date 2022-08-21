import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Urls from '../../constants/Urls';

const TokenScreen = props => {
    const [code, setCode] = useState();


    const postVerifyToken = async () => {
        try {
            await fetch(Urls.CONFIRM_PASSWORD_RESET, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: 'a', token: code })
            }).then((res) => {
                if (res.status === 400) {
                    //TODO:navigate to set password screen
                    props.navigation.navigate({routeName:'Reset', params:{'code':code}})
                }
                else if (res.status === 404) {
                    Alert.alert('Code Error', 'Check the code', ["Okay"]);
                }
            })
        } catch (error) {
            console.log(error);
            Alert.alert('Sorry', 'something went worng!', ["Okay"]);
        }
    }

    return (
        <View style={styles.screen}>
            <TextInput placeholder="Enter Code Here" onChangeText={setCode} value={code}/>
            <CustomButton title="Confirm Code" onPress={postVerifyToken} />
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

export default TokenScreen;