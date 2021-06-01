import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Urls from '../../constants/Urls';
import Colors from '../../constants/Colors';

const ForgotPasswordRequestScreen = props => {
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);

    const emailHandler = text => {
        setEmail(text)
    }
    const postRequestReset = async () => {
        setLoading(true)
        // status code 200 -> mail send
        // status code 400 bad request -> invaild mail
        console.log('im inside the post request request func')
        try {
        console.log('im inside the post request request func')

            await fetch(Urls.REQUEST_RESET_PASSWORD, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })

            }).then((res) => {
        console.log('im inside the post request request func')

                if (res.status === 200) {
                    props.navigation.navigate('Token')
                    //TODO: mention the correct navigaion
                }
                else if (res.status === 400) {
                    Alert.alert('invalid', res.json().email, ["Okay"]);
                }
            })
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <View style={styles.screen}>
            <TextInput 
                autoCapitalize='none' 
                style={styles.input}
                placeholder="email" 
                value={email}
                onChangeText={setEmail} />
            
            {loading ? <ActivityIndicator size='large' color={Colors.blue} /> : <CustomButton 
                title="Confirm" 
                onPress={postRequestReset} /> }
            
        </View>);
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
});

export default ForgotPasswordRequestScreen;