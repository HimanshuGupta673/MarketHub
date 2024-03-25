import { View, Text, TextInput, Button, TouchableOpacity, ToastAndroid, StyleSheet, Image, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../FirebaseConfig'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

import * as ImagePicker from 'expo-image-picker';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

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

  const onSumbitMethod = (value) => {
    value.image = image
    console.log(value)
  }

  return (
    <View contentContainerStyle={{ flexGrow: 1 }} className="p-10 min-h-[100vh]">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">Create New Post and Start Selling</Text>
      <Formik initialValues={{ title: '', desc: '', category: '', address: '', price: '', image: '' }}
        onSubmit={value => onSumbitMethod(value)}
        validate={(values) => {
          const errors = {}
          if (!values.title) {
            console.log("Title not present");
            ToastAndroid.show('Title must be there', ToastAndroid.SHORT);
            errors.name = "Title must be there"
          } else if (!values.desc) {
            console.log("Description not present");
            ToastAndroid.show('Description must be there', ToastAndroid.SHORT)
            errors.name = "Description must be there"
          } else if (!values.category) {
            console.log("Category not present");
            ToastAndroid.show('Category must be there', ToastAndroid.SHORT)
            errors.name = "Category must be there"
          } else if (!values.address) {
            console.log("Address not present");
            ToastAndroid.show('Address must be there', ToastAndroid.SHORT)
            errors.name = "Address must be there"
          } else if (!values.price) {
            console.log("Price not present");
            ToastAndroid.show('Price must be there', ToastAndroid.SHORT)
            errors.name = "Price must be there"
          }
          return errors;
        }}
      >
        {
          ({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" >
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}  showsVerticalScrollIndicator={false}> 
                <TouchableOpacity onPress={pickImage}>
                  {image ?
                    <Image source={{ uri: image }}
                      style={{ width: 100, height: 100, borderRadius: 15 }}
                    /> :
                    <Image source={require('./../../assets/images/placeholder.jpg')}
                      style={{ width: 100, height: 100, borderRadius: 15 }}
                    />
                  }
                </TouchableOpacity>
                <TextInput style={styles.input}
                  placeholder='Title'
                  value={values?.title}
                  onChangeText={handleChange('title')}
                />

                <TextInput style={styles.input}
                  placeholder='Description'
                  value={values?.desc}
                  numberOfLines={5}
                  onChangeText={handleChange('desc')}
                />

                <TextInput style={styles.input}
                  placeholder='Price'
                  value={values?.price}
                  onChangeText={handleChange('price')}
                  keyboardType='number-pad'
                />

                <TextInput style={styles.input}
                  placeholder='Address'
                  value={values?.address}
                  onChangeText={handleChange('address')}
                />

                <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                  <Picker selectedValue={values.category}
                    onValueChange={itemValue => setFieldValue('category', itemValue)}
                  >
                    {
                      categoryList && categoryList.map((item, index) => (
                        <Picker.Item key={index}
                          label={item?.name} value={item?.name}
                        />
                      ))
                    }
                  </Picker>
                </View>
                <TouchableOpacity onPress={handleSubmit} className="p-4 bg-blue-500 mt-10">
                  <Text className="text-white text-center text-[16px]">Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          )
        }
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    paddingHorizontal: 17,
    fontSize: 17,
    marginTop: 10, marginBottom: 5,
  }
})
