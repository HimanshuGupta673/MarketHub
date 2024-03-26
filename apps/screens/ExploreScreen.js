import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../FirebaseConfig'
import LatestItemList from '../components/homeScreen/LatestItemList';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList,setProductList] = useState([]);
  useEffect(()=>{
    getAllProducts();
  },[]);

  const getAllProducts = async() =>{
    const q = query(collection(db,'UserPost'),orderBy('createdAt','desc'));
    const snapShot = await getDocs(q);

    snapShot.forEach((doc)=>{
        setProductList(productList=>[...productList,doc.data()]);
    })
  }

  
  return (
    <View className="p-5 py-8">
      <Text className="text-[30px] font-bold">Explore More</Text>
      <LatestItemList latestItemList={productList}/>
    </View>
  )
}