import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CategoryItem from '../screens/CategoryItem';
import ProductDetail from '../screens/ProductDetail';

export default function HomeScreenStackNavigation() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Stack-Home" component={HomeScreen} />
      <Stack.Screen name="CategoryItem" component={CategoryItem} options={({route})=>({title:route.params.category,headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff'})}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerStyle:{backgroundColor:'#3b82f6'},headerTintColor:'#fff',headerTitle:'Detail'}} />
    </Stack.Navigator>
  )
}