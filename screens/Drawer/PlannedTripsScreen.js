import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet,FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Urls from '../../constants/Urls';

const PlannedTripScreen = props => {
    const [userPlannedTrip, setUserPlannedTrip] = useState();

    const getUserPlannedTrips = async () => {
        const token = await AsyncStorage.getItem("MR_Token");
        console.log("token --------------", token)
        if(token){
            try{
                await fetch(Urls.USER_PLANNED_TRIP,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }).then((res) => {
                    if(res.status === 200){
                        return res.json()
                    }
                    else{
                        // Alert function
                    }
                }).then((res) => {
                    console.log(res)
                    setUserPlannedTrip(res)
                })
            }
            catch(error){
                console.log(error);
                // Alert function
            }
        }
        else{
            props.navigation.navigate('auth');
        }

    }
    useEffect(()=>{
        getUserPlannedTrips()
    },[])
    return (<View style={styles.screen}>
                <View style={styles.listContianer}>
                <FlatList
                data={userPlannedTrip}
                keyExtractor ={(item,index) => item.id}
                renderItem = {(itemData) => {
                    return(
                        <TouchableOpacity onPress={()=>{props.navigation.navigate({routeName:'DetailPlannedTrip', 
                                            params:{data:itemData.item}})}}>
                        <View style={styles.container}>
                            <Text style={styles.titleText}>{itemData.item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                 />
                </View>
            </View>);
}

PlannedTripScreen.navigationOptions = navData => {
    return ({
        headerTitle:"Planned Trips"
    })
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        marginVertical:10,
        padding:10
    },
    container:{
        width:"100%",
        margin:3,
        padding:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
    },
    
   titleText:{
       fontWeight:'bold',
       fontSize:18
   }

});

export default PlannedTripScreen;