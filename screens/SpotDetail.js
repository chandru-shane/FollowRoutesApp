import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Modal,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import AddPlaceTrip from '../components/AddPlaceTrip';
import Colors from '../constants/Colors';


const SpotDetail = props => {
    const data = props.navigation.getParam('item');
    
    console.log('printing from spotdetail ')
    console.log(data);
    let cost;
    if (data.spot_cost){
        cost = data.spot_cost;
    }
    else{
        cost = 0;
    }
    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.bgImageContainer}>
                    <ImageBackground style={styles.imageBg} source={{ uri: data.image }} >
                        <View style={{ justifyContent: 'flex-end', alignItems: 'stretch' }}>
                            <Text style={{ color: 'white', fontSize: 22, textAlign: 'right' }}>{data.name}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.detailContainer}>
                    
                    <Text>Rating: 5/5</Text>
                    
                        <Text>Cost:${cost}</Text>
                        {/* <MaterialIcons name="add-location-alt" size={30} color="red" /> */}
                        <AddPlaceTrip placeId={data.id} navigation={props.navigation}/>
                       
                        
                    
                </View>

                <View style={styles.detail}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text>{data.description}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

SpotDetail.navigationOptions = navData => {
    const isUser = navData.navigation.getParam('isUser')
    const data = navData.navigation.getParam('item');
    if(isUser){
        return {
            headerTitle: navData.navigation.getParam('title'),
            headerRight:(<TouchableOpacity onPress={() => {
                navData.navigation.navigate({
                    routeName: 'UpdatePlace', params: {
                        item: data,
                        title: data.name,
                        username: data.user_displayname
                    }
                })
            }}>
                <Text style={{ color: Colors.blue, padding: 10 }}>Update</Text>
            </TouchableOpacity>)
        } 
    }
    return {
        headerTitle: navData.navigation.getParam('title'),
        
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
    detail:{
        margin:10,
    },
    descriptionTitle:{
        fontSize:18,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingVertical:10,
    },
    
})

export default SpotDetail;