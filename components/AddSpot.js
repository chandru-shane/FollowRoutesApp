import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 



const AddSpot = props =>{
    return (<View style={styles.addSpotContainer}>
        <MaterialIcons name="add-location" size={40} color="green" />
        <Text>Add New Spot</Text>
    </View>);
}


const styles = StyleSheet.create({
    addSpotContainer:{
        justifyContent:'center',
        alignItems:'center'
    }
});

export default AddSpot;