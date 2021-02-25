import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';


import Home from '../screens/Home';
import DetailTrip from '../screens/DetailTrip';
import User from '../screens/User';
import MainAuth from '../screens/MainAuth';
import SpotDetail from '../screens/SpotDetail';

const HomeNavigator = createStackNavigator({

  Home: {
    screen: Home, navigationOptions: {
      headerShown: false,
    }
  },
  Detail: DetailTrip,
  SpotDetail: SpotDetail,
})


const UserNavigator = createStackNavigator({
  User: {
    screen: User, navigationOptions: {
      header: null,
    }
  },
})





const tabScreenConfig = {
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <AntDesign name="home" size={24} color="black" />
        );
      },
      tabBarColor: 'white'
    }
  },
  User: {
    screen: UserNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <AntDesign name="user" size={24} color="black" />
        );
      },
      tabBarColor: 'white'
    }
  }
}



const TabNavigator = createBottomTabNavigator(
  tabScreenConfig
);


const Navigator = createSwitchNavigator({
  Auth: MainAuth,
  App: TabNavigator,
})

export default createAppContainer(Navigator);