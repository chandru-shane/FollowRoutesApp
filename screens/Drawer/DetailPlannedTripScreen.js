import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CardSpot from '../../components/CardSpot';
import CustomButton from '../../components/CustomButton'
import { Ionicons } from '@expo/vector-icons';

const DetailPlannedTripScreen = props => {
    const data = props.navigation.getParam('data')
    console.log("=================", data, "==============")
    return (<View style={styles.screen}>
        <View style={styles.titleContainer}>

            <Text style={styles.titleText}>
                {data.name}
            </Text>
    
            <View style={styles.mainInfoContainer}>
                <View style={styles.infoContainer}>
                <Ionicons name="ios-person" size={20} color="black" />
                    <Text style={styles.personText}>{data.person}</Text>
                </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Budget:</Text>
                <Text>{data.cost}</Text>
            </View>
            </View>

        </View>
        <View styles={styles.detailContainer}>
        <Text style={styles.descriptionTitleText}>Description</Text>
        <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>{data.description}</Text>
            <CustomButton title="See Places on map" />
        </View>
        </View>

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
                                'isUser': itemData.item.place.is_user,
                                'contribute': true
                            }
                        }
                    )} />
            }} />
    </View>);
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 4,
        padding: 2,
     
    },
    titleContainer: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        // justifyContent:'center',
        // alignItems:'center'
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign:'center'
    },
    descriptionTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionTextContainer: {
        marginHorizontal: 10,
            
    },
    descriptionText: {
        fontSize: 15
    },
    mainInfoContainer:{
        flexDirection:'row',
        margin:2,
        justifyContent:'space-evenly'
    },
    infoContainer:{
        flexDirection:'row',
        margin:2,
        // justifyContent:'space-evenly'
    },
    infoText:{
        fontWeight:'bold',
    },detailContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    personText:{
        marginHorizontal:10
    }
})

export default DetailPlannedTripScreen;