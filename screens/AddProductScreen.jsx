import React, { useState } from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !category || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    // Upload Image to Firebase Storage
    const imageRef = ref(storage, `products/${Date.now()}.jpg`);
    const response = await fetch(image);
    const blob = await response.blob();
    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);

    // Add product to Firestore
    await addDoc(collection(db, "products"), {
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl,
      userId: auth.currentUser.uid,
    });

    alert("Product added!");
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Add Product</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
      
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
}
