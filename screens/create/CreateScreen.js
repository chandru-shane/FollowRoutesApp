import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ActionButton from '../../components/ActionButton';


const CreateScreen = props => {



  return <View style={styles.screen}>
    

    <ActionButton buttonColor="rgba(231,76,60,1)" >

      <ActionButton.Item buttonColor='#3498db' title="Plan Trip" onPress={() => { props.navigation.navigate('PlanTrip') }}>
        <Ionicons name="create-outline" size={24} color="black" />
      </ActionButton.Item>

      <ActionButton.Item buttonColor='#9b59b6' title="Create Trip" onPress={() => { props.navigation.navigate('CreateTrip') }}>
        <MaterialIcons name="add-road" size={24} color="black" />
      </ActionButton.Item>
      


    </ActionButton>
  </View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    margin:2,
    backgroundColor:'white',
    overflow:'visible',
    zIndex: 200
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container:{
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    // elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation:0.5,
    marginVertical:10,
    overflow:'hidden'
    // alignItems:'center',
    // justifyContent:'center'
    
  },
  title:{
    fontSize:20,
    textAlign:'center'
  }
})

export default CreateScreen;
