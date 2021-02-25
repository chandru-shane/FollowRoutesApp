import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const LogoText = props => {
    return (
        <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>FollowRoutes</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    logoTextContainer: {
        margin: 10,
    },
    logoText: {
        fontSize: 30,
        fontWeight: '500',
    }
})


export default LogoText;