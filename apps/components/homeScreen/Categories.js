import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({categoryList}) {
  const navigation = useNavigation();
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
       data={categoryList}
       numColumns={4}
       renderItem={({item,index})=>(
        <TouchableOpacity onPress={()=>navigation.navigate('CategoryItem',{category:item?.name})} className="flex-1 items-center justify-center p-2 border-[1px] border-gray-300 m-1 h-[80px] rounded-lg">
          <Image className="w-[35px] h-[35px]" source={{uri:item?.icon}}/>
           <Text className="text-[12px] mt-1">{item?.name}</Text>
        </TouchableOpacity>
       )}
      />
    </View>
  )
}