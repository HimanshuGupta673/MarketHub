import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNavigation from './HomeScreenStackNavigation';
import ExploreScreenStackNavigation from './ExploreScreenStackNavigation';
import ProfileScreenStackScreen from './ProfileScreenStackScreen';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'#000'
    }}>
        <Tab.Screen name='home' component={HomeScreenStackNavigation} options={{
            
            headerShown:false,
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text>
            ),
            tabBarIcon:({color,size})=>(
                <AntDesign name="home" size={24} color="black" />
            )
        }}/>
        <Tab.Screen name='explore' component={ExploreScreenStackNavigation} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Explore</Text>
            ),
            tabBarIcon:({color,size})=>(
                <AntDesign name="search1" size={24} color="black" />
            )
        }}/>
        <Tab.Screen name='addPost' component={AddPostScreen} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Add Post</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Feather name="camera" size={24} color="black" />
            )
        }}/>
        <Tab.Screen name='profile' component={ProfileScreenStackScreen} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile</Text>
            ),
            tabBarIcon:({color,size})=>(
                <Ionicons name="person-circle" size={24} color="black" />
            )
        }}/>
    </Tab.Navigator>
  )
}