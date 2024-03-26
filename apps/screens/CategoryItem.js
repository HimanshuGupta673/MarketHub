import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LatestItemList from '../components/homeScreen/LatestItemList';
import { app } from '../../FirebaseConfig';

export default function CategoryItem() {
    const db = getFirestore(app);
    const { params } = useRoute();
    const [itemList, setItemList] = useState([])
    useEffect(() => {
        params && getCategoryListItems();
    }, [params])

    const getCategoryListItems = async () => {
        setItemList([]);
        const q = query(collection(db, 'UserPost'), where('category', '==', params.category))
        const snapShot = await getDocs(q);
        snapShot.forEach(doc => {
            setItemList(itemList => [...itemList, doc.data()]);
        })
    }
    return (
        <View className="p-2">
            {
                itemList?.length > 0 ?
                    <LatestItemList latestItemList={itemList} heading={'Latest' + params.category + 'Items'} />
                    :
                    <Text className="p-5 text-[20px] mt-24 justify-center text-center">No Post Found</Text>
            }
        </View>
    )
}