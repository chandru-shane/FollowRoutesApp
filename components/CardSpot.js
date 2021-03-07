import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CardSpot = props => {
    console.log(props.image)
    return (
        <TouchableOpacity onPress={props.navigateToSpotDetail}>
            <View style={styles.spotContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.spotImage}
                        source={{ uri: props.image }}
                    />
                </View>
                <Text style={styles.spotName}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    spotContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        height: 90,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        overflow: 'hidden'
    },
    imageContainer: {
        width: '25%',
        height: 80,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',

    },
    spotImage: {
        width: '100%',
        height: '100%'
    },
    spotName:{
        textAlign:'center',
        padding:10,
        margin:10,
        fontSize:18
    }
})

export default CardSpot;