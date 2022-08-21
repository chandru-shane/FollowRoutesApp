import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../../constants/Urls';


const ConfirmDonationScreen = props => {

    let error= <Text></Text>;
    const postConfirmDonation = async () => {
        const stirpeToken = props.navigation.getParam('stripeToken');
        const amount = props.navigation.getParam('amount')*100;
        const recipient = props.navigation.getParam('recipient');
        console.log('amount enterd', amount)
        
        // TODO: Remove console logs
        console.log(stirpeToken, ")))))))))))))))))))))))))", stirpeToken.length)

        const tokens = await AsyncStorage.getItem('MR_Token');
        try {
            await fetch(Urls.DONATE_STRIPE, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${tokens}`
                    // , amount:amount, trip: null, user:null
                },
                body: JSON.stringify({ token: stirpeToken, amount: amount, recipient:recipient, currency:'inr' })

            }).then((res) => {
                console.log(res)
                if (res.status===200){
                    
                    props.navigation.navigate('User')
                }
                else if(res.status!=200){
                        error= <Text>Failed</Text>
                }
                return res.json()

            }).then((res) => {
                console.log(res);
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });

            }).catch((err) => { console.log(err) })
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        console.log('staring');
        postConfirmDonation();
        console.log('ending')
        // props.navigation.navigate('Home');
    }, [])

    return (<View>
        <Text>loading....</Text>
        {error}
    </View>)
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
})

export default ConfirmDonationScreen;