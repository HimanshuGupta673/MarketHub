import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({ item }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>navigation.push('ProductDetail',{product:item})} className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200">
            <Image className="w-full h-[140px] rounded-lg" source={{ uri: item?.image }} />
            <View>
                <Text className="text-[15px] font-bold mt-2">{item?.title}</Text>
                <Text className="text-[20px] font-bold text-blue-500">₹ {item?.price}</Text>
                <Text className="text-green-500 bg-green-200 mt-1 p-[2px] text-center rounded-full px-1 text-[11px] font-bold w-[70px]">{item?.category}</Text>
            </View>

        </TouchableOpacity>
    )
}