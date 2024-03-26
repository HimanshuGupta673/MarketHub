import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../screens/ExploreScreen';
import ProductDetail from '../screens/ProductDetail';

export default function ExploreScreenStackNavigation() {
    const stack = createStackNavigator();
  return (
    <stack.Navigator>
        <stack.Screen name='Explore-Screen' component={ExploreScreen} options={{headerShown:false}}/>
        <stack.Screen name='ProductDetail' component={ProductDetail} options={{headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff',headerTitle:'Detail'}}/>
    </stack.Navigator>
  )
}