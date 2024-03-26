import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import MyProducts from '../screens/MyProducts';
import ExploreScreen from '../screens/ExploreScreen';
import ExploreScreenStackNavigation from './ExploreScreenStackNavigation';
import ProductDetail from '../screens/ProductDetail';

export default function ProfileScreenStackScreen() {
    const stack = createStackNavigator();
  return (
      <stack.Navigator>
        <stack.Screen name='profile_tab' component={ProfileScreen} options={{headerShown:false}}/>
        <stack.Screen name='my-products' component={MyProducts} options={{headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff',headerTitle:'My Products'}}/>
        <stack.Screen name='explore-s' component={ExploreScreen} options={{headerShown:false}}/>
        <stack.Screen name='ProductDetail' component={ProductDetail} options={{headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff',headerTitle:'Detail'}}/>
    </stack.Navigator>
  )
}