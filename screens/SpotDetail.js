import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpotDetail = props => {
    return (
        <View styles={styles.screen}><Text>Hello world</Text></View>
    )
}

SpotDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title')
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SpotDetail;