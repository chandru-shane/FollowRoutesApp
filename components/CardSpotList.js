import React from 'react';
import {View, FlatList} from 'react-native';
import CardSpot from './CardSpot';

const CardSpotList = props => {
    const data = props.data
    console.log('==========',data,'=======================')
    return(
        <View>
            <FlatList data={props.data}
             renderItem={(itemData)=><CardSpot
                                     image={itemData.item.place.image}
                                      name={itemData.item.place.name}
                                       cost={itemData.item.spot_cost}
                                       navigateToSpotDetail={props.navigateToSpotDetail}   />} />
        </View>
    )
}

// const styles = StyleSheet.create({})


export default CardSpotList;