import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Colors from '../constants/Colors';



const CreateMapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();

    const saveCoordinates = props.navigation.getParam('saveCoordinates');

    const locationPicker = (event) =>{
        // console.log(event);
        setSelectedLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude})
        console.log(selectedLocation)
        saveCoordinates(event.nativeEvent.coordinate.latitude,
            event.nativeEvent.coordinate.longitude)
    }  
    
    return (<MapView style={styles.mapView} onPress={locationPicker}>
            {selectedLocation && <Marker title="Picked Location"  coordinate={selectedLocation}></Marker>}
    </MapView>);
} 

const styles = StyleSheet.create({
    mapView:{
        flex:1
    }
});

CreateMapScreen.navigationOptions = navData =>{
    
    return  {
        headerRight: <TouchableOpacity onPress={()=>{navData.navigation.goBack()}}><View style={{margin:10}}><Text style={{color:Colors.blue}}>Save</Text></View></TouchableOpacity>
    }
}

export default CreateMapScreen;