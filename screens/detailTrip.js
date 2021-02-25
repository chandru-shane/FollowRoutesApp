import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Button } from 'react-native';
import CardSpotList from '../components/CardSpotList';


const DetailTrip = props => {

    const data = props.navigation.getParam('item');
    const spots = data.spot
    console.log(data, 'detail')
    console.log(spots, 'this data')
    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.bgImageContainer}>
                    <ImageBackground style={styles.imageBg} source={{ uri: data.thumbnail }} >
                        <View style={{ justifyContent: 'flex-end', alignItems: 'stretch' }}>
                            <Text style={{ color: 'white', fontSize: 22, textAlign: 'right' }}>{data.name}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.detailContainer}>
                    <Text>Days: {data.day}</Text>
                    <Text>Rating: 5/5</Text>
                    <Text>Budget:${data.cost}</Text>
                    <Button color='red' title='Donate' />
                </View>

                <CardSpotList
                    data={spots}
                    navigation={props.navigation} />

            </View>
        </ScrollView>
    )
}

DetailTrip.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title')
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bgImageContainer: {
        width: '100%',
        height: 200,
    },
    imageBg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'flex-end',
    },

    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center'
    },
})

export default DetailTrip;