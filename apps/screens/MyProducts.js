import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../FirebaseConfig'
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../components/homeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {
    const db = getFirestore(app);
    const [productList,setProductList] = useState([])
    const {user}  = useUser()
    const navigation = useNavigation()

    useEffect(()=>{
      navigation.addListener('focus',(e)=>{
           getUserPost();
      })
    },[navigation])
    useEffect(()=>{
        user && getUserPost(); 
    },[user])
    const getUserPost = async () => {
        try {
            const q = query(collection(db, 'UserPost'), where('userEmail', '==', user.primaryEmailAddress.emailAddress));
            const snapshot = await getDocs(q);
            const tempProductList = [];
            snapshot.forEach((doc) => {
                tempProductList.push(doc.data());
            });
            setProductList(tempProductList);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };
    
  return (
    <View>
      <LatestItemList latestItemList={productList}/>
    </View>
  )
}