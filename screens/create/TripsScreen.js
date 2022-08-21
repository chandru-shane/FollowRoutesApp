import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ActionButton from '../../components/ActionButton';


const TripsScreen = props => {
  return <View style={styles.screen}>
    <Text>Create Places</Text>


    <ActionButton buttonColor="rgba(231,76,60,1)">
      <ActionButton.Item buttonColor='#9b59b6' title="New Trip" onPress={() => { props.navigation.navigate('CreateTrip') }}>
        <MaterialIcons name="add-road" size={24} color="black" />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#3498db' title="New Place" onPress={() => { props.navigation.navigate('CreatePlace') }}>
        <MaterialIcons name="place" size={24} color="black" style={styles.actionButtonIcon} />
      </ActionButton.Item>

    </ActionButton>
  </View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TripsScreen;