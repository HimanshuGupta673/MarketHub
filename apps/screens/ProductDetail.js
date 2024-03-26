import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../FirebaseConfig';
export default function ProductDetail({ navigation }) {
    const { params } = useRoute();
    const [product, setProducts] = useState([]);
    const { user } = useUser();
    const db = getFirestore(app);
    const nav = useNavigation()

    useEffect(() => {
        params && setProducts(params.product)
        shareButton();
    }, [[params, navigation]])

    const sendEmail = () => {
        try {
            const subject = 'Regarding' + product.title;
            const body = "Hi " + product.userName + "\n" + "I am interested in this product"
            Linking.openURL('mailto:' + product.userEmail + "?" + subject + "&body=" + body);
        } catch (e) {
            console.log(e)
        }
    }

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <AntDesign onPress={() => shareProduct()} style={{ marginRight: 15 }} name="sharealt" size={24} color="white" />
            )
        })
    }

    const shareProduct = () => {
        const content = {
            message: product?.title + "\n" + product?.desc,
        }
        Share.share(content)
            .then(resp => {
                console.log(resp)
            }, (error) => {
                console.log(error)
            })
    }
    const deleteUserPost = () => {
        Alert.alert('Do you want to delete?', "Are you want to delete this post?", [
            {
                text: 'Yes',
                onPress: () => deleteFromFirestore()
            },
            {
                text: 'Cancel',
                onPress: () => console.log("Cancel Pressed")
            },
        ])
    }
    const deleteFromFirestore = async () => {
        const q = query(collection(db, 'UserPost'), where('title', '==', product.title))
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            deleteDoc(doc.ref).then(resp => {
                console.log("Deleted the doc...")
                nav.goBack();
            })
        })
    }
    return (
        <ScrollView className="bg-white">
            <Image source={{ uri: product.image }} className="w-full h-[320px]" />

            <View className="p-3 mb-6">
                <Text className="text-[24px] font-bold">{product.title}</Text>
                <View className="items-baseline">
                    <Text className="bg-green-200 text-green-600 p-1 mt-2 px-2 rounded-full">{product.category}</Text>
                </View>
                <Text className="mt-3 font-bold text-[20px]">Description</Text>
                <Text>{product?.desc}</Text>
            </View>


            <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
                <Image source={{ uri: product.userImage }} className="w-12 h-12 rounded-full" />
                <View>
                    <Text className="font-bold text-[18px]">{product.userName}</Text>
                    <Text className="text-gray-500">{product.userEmail}</Text>
                </View>
            </View>


            {
                user.primaryEmailAddress.emailAddress == product.userEmail ?
                    <TouchableOpacity onPress={() => deleteUserPost()} className="z-40 bg-red-500 rounded-full p-4 m-2">
                        <Text className="text-center text-white">Delete Post</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => sendEmail()} className="z-40 bg-blue-500 rounded-full p-4 m-2">
                        <Text className="text-center text-white">Send Message</Text>
                    </TouchableOpacity>
            }

        </ScrollView>
    )
}