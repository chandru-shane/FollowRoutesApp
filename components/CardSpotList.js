import React from 'react';
import { View, FlatList } from 'react-native';
import CardSpot from './CardSpot';

const CardSpotList = props => {
    const data = props.data
    console.log('==========', data, '=======================')
    return (
        <View>
            <FlatList data={props.data}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) => <CardSpot
                    image={itemData.item.image}
                    name={itemData.item.name}
                    cost={itemData.item.spot_cost}
                    navigateToSpotDetail={() => props.navigation.navigate(
                        {
                            routeName: 'SpotDetail',
                            params: {
                                'item': itemData.item,
                                'title': itemData.item.name,
                                'isUser':props.isUser
                            }
                        }
                    )} />} />
        </View>
    )
}

// const styles = StyleSheet.create({})


export default CardSpotList;