import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

export default function HomeScreenStackNavigation() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stack-Home" component={Home} />
      <Stack.Screen name="CategoryItem" component={Notifications} />
      <Stack.Screen name="ProductDetail" component={Profile} />
    </Stack.Navigator>
  )
}