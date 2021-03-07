import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailTripScreen = props => {
    const data = props.navigaion.getParam('res')
    console.log('consoling from detail trip')
    console.log(data)
    return (
        <View style={styles.screen}>
            <Text>Detial Trip Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default DetailTripScreen;