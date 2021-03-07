import { createMaterialTopTabNavigator, createTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import TripsScreen from './TripsScreen';
import PlacesScreen from './PlacesScreen';

const CreateTapNaviator = createMaterialTopTabNavigator({
  Trips: {
    screen: TripsScreen,
    topBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'Black'
    }
  },
  Places: PlacesScreen
})


export default createAppContainer(createTabNavigator);
