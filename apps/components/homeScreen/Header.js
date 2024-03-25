import { View, Text, TextInput,Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons';
export default function Header() {
    const {user} = useUser();
    return (
    <View>
       <View className = "flex flex-row items-center gap-2">
          <Image source={{uri:user?.imageUrl}}
            className="rounded-full w-12 h-12"
          />
          <View>
            <Text className="text-[16px]">Welcome</Text>
            <Text className="text-[20px] font-bold">{user?.fullName}</Text>
          </View>

       </View>


       <View className="p-[9px] px-5 flex flex-row items-center bg-blue-50 mt-5 rounded-full border-[1px] border-blue-300">
       <AntDesign name="search1" size={24} color="gray" />
       <TextInput onChange={(value)=>console.log(value)} placeholder='Search' className="mr-3 text-[18px]"/>
       </View>
    </View>
  )
}