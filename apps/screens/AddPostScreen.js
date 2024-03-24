import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { app } from '../../FirebaseConfig'
import {collection, getDocs, getFirestore} from "firebase/firestore";

export default function AddPostScreen() {
  const db = getFirestore(app);
  useEffect(()=>{
    getCategoryList();
  },[]);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'category'));
      querySnapshot.forEach(doc => {
        console.log("Doc data:", doc.data());
      });
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };
  
  return (
    <View>
      <Text>AddPostScreen</Text>
    </View>
  )
}