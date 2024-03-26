import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/homeScreen/Header'
import Slider from '../components/homeScreen/Slider'
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore';
import Categories from '../components/homeScreen/Categories';
import LatestItemList from '../components/homeScreen/LatestItemList';
import { app } from '../../FirebaseConfig';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList,setSliderList] = useState([]);
  const [categoryList,setCategoryList] = useState([]);
  const [latestItemList,setLatestItemList] = useState([]);
  useEffect(()=>{
    getSliders();
    getCategoryList();
    getLatestItemList();
  },[])

  const getSliders =async()=>{
    setSliderList([])
    const querySnapshot = await getDocs(collection(db,"Slider"));
    querySnapshot.forEach((doc)=>{
      setSliderList(sliderList=>[...sliderList,doc.data()]);
    })
  }

  const getCategoryList = async () => {
    setCategoryList([]);
    try {
      const querySnapshot = await getDocs(collection(db, 'category'));
      querySnapshot.forEach(doc => {
        setCategoryList(categoryList => [...categoryList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };

  const getLatestItemList = async () => {
    setLatestItemList([]);
    try {
      const querySnapshot = await getDocs(collection(db, 'UserPost'),orderBy('createdAt','desc'));
      querySnapshot.forEach(doc => {
        setLatestItemList(latestItemList => [...latestItemList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching LatestItemList list:", error);
    }
  };

  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
       <Header/>
       <Slider sliderList={sliderList}/>
       <Categories categoryList={categoryList}/>
       <LatestItemList className="mb-2" latestItemList={latestItemList} heading={'Latest Items'}/>
    </ScrollView>
  )
}