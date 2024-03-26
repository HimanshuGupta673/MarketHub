import { View, Text,Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import {  useClerk, useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const {user} = useUser();
  const navigation = useNavigation();
  const menuList = [
    {
      id:1,
      name:'My Products',
      path:'my-products'
    },
    {
      id:2,
      name:'Explore',
      path:'explore-s'
    },
    {
      id:3,
      name:'Logout'
    },
  ]

  const onMenuPress = (item) =>{
      if(item.name=='Logout'){
        signOut();
      }
      item.path?navigation.navigate(item.path):null;
  }
  return (
    <View className="p-5 flex-1 bg-white">
      <View className="items-center mt-14">
        <Image source={{uri:user?.imageUrl}} className="w-[100px] h-[100px] rounded-full"/>
         <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
         <Text className="text-[18px] mt-2 text-gray-500">{user?.primaryEmailAddress?.emailAddress}</Text>        
      </View>
     
       <FlatList 
        data={menuList}
        numColumns={2}
        style={{marginTop:20}}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=>onMenuPress(item)} className="flex-1 p-2 pb-4 border-[1px] items-center m-4 mx-4 mt-4 rounded-lg border-blue-400 bg-blue-50">
           <Text className="font-bold text-[18px] mt-2 text-black-700">{item?.name}</Text>
          </TouchableOpacity>
        )}
       />
    </View>
  )
}