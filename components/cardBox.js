import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const CardBox = props => {
    return(
      
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onSelect}>
            <View>
        <ImageBackground source={{ uri: props.thumbnail }}
            style={styles.image} />
        <View style={styles.detailContainer}>
            <Text>Budget: ${props.cost}</Text>
            <Text>Days: {props.day}</Text>
            <Text>Rating: 5/5</Text>
        </View>
        </View>
        </TouchableOpacity>
    </View>
    )
}

CardBox.navigationOptions = navData ={
    
}

const styles = StyleSheet.create({
    container: {

        height: 210,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',

    },
    image: {
        width: '100%',
        height: '85%',
        justifyContent: 'flex-end',
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default CardBox;