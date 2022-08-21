import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateSpotScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Hello Spot Create</Text>
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

export default CreateSpotScreen;