import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const CardBox = props => {
    return(
        <View style={styles.container}>

        <ImageBackground source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg' }}
            style={styles.image} />
        <View style={styles.detailContainer}>
            <Text>Budget: $2000</Text>
            <Text>Days: 5</Text>
            <Text>Rating: 5/5</Text>
        </View>

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
        marginVertical: 10,
        marginHorizontal: '10%',
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