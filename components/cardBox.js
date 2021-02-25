import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const CardBox = props => {
    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={props.onSelect}>
                <View>
                    <ImageBackground source={{ uri: props.thumbnail }}
                        style={styles.image}>

                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={1}>
                                {props.title}
                            </Text>
                        </View>
                    </ImageBackground>
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
        height: '88%',
        justifyContent: 'flex-end',
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {

        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        // justifyContent:'flex-end'
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default CardBox;