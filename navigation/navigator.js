import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer' 
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { AntDesign, Ionicons } from '@expo/vector-icons';


import Home from '../screens/Home';
import DetailTrip from '../screens/DetailTrip';
import User from '../screens/User';
import MainAuth from '../screens/MainAuth';
import SpotDetail from '../screens/SpotDetail';
import CreateScreen from '../screens/create/CreateScreen';
import CreateTripScreen from '../screens/create/CreateTripScreen';
import CreatePlaceScreen from '../screens/CreatePlaceScreen';
import PlanTripScreen from '../screens/create/PlanTripScreen';
import CreateSpotScreen from '../screens/create/CreateSpotScreen';
import DetailTripScreen from '../screens/create/DetialTripScreen';
import UpdateTripScreen from '../screens/UpdateTripScreen'
import CreateMapScreen from '../screens/CreateMapScreen';
import TripsScreen from '../screens/Drawer/TripsScreen';
import PlacesScreen from '../screens/Drawer/PlacesScreen';
import PlannedTripScreen from '../screens/Drawer/PlannedTripsScreen';
import UpdatePlaceScreen from '../screens/UpdatePlaceScreen';
import DetailPlannedTripScreen from '../screens/Drawer/DetailPlannedTripScreen';



const HomeNavigator = createStackNavigator({

  Home: {
    screen: Home, navigationOptions: {
      // headerShown: false,
    }
  },
  Detail: DetailTrip,
  SpotDetail: SpotDetail,
  UpdateTrip:UpdateTripScreen,
  CreatePlace:CreatePlaceScreen,
  UpdatePlace:UpdatePlaceScreen,
  CreateMap: CreateMapScreen
})



const UserNavigator = createStackNavigator({
  User: {
    screen: User, navigationOptions: {
      // header: null,
    }
  },
})


const drawerNavigation = createDrawerNavigator({
  Trips: TripsScreen,
  Places:PlacesScreen,
  PlannedTrips:PlannedTripScreen,
})

const CreateNavigator = createStackNavigator({
  CreateScreen:CreateScreen,
  CreateTrip:CreateTripScreen,
  
  PlanTrip:PlanTripScreen,
  DetailTrip:DetailTripScreen,
  
  
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
  Create:{
    screen:CreateNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="md-add" size={30} color="black" />
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

const PlannedTripNavigation = createStackNavigator({
  PlannedTrips:PlannedTripScreen,
  DetailPlannedTrip:DetailPlannedTripScreen
})

const tstnavigator = createDrawerNavigator({
  Home:TabNavigator,
  Trips: TripsScreen,
  Plans:PlannedTripNavigation
})

const Navigator = createSwitchNavigator({
  Auth: MainAuth,
  App: tstnavigator,
})

export default createAppContainer(Navigator);