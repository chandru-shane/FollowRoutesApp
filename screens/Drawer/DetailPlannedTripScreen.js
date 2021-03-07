import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CardSpot from '../../components/CardSpot';


const DetailPlannedTripScreen = props => {
    const data = props.navigation.getParam('data')
    // console.log(data[0].place)
    return (<View>
    <Text>
        Hello world
    </Text>
    <FlatList data={data.place}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) => {
                    return <CardSpot
                    image={itemData.item.place.image}
                    name={itemData.item.place.name}
                    cost={itemData.item.place.spot_cost}
                    navigateToSpotDetail={() => props.navigation.navigate(
                        {
                            routeName: 'SpotDetail',
                            params: {
                                'item': itemData.item.place,
                                'title': itemData.item.place.name,
                                'isUser':itemData.item.place.is_user,
                                'contribute':true
                            }
                        }
                    )} />
                }} />
    </View>);
}

const styles = StyleSheet.create({})

export default DetailPlannedTripScreen;