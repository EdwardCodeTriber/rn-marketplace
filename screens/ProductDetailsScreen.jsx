import React from "react";
import { View, Text, Image, Button } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;

  const handleDelete = async () => {
    if (auth.currentUser.uid !== product.userId) {
      alert("You can only delete your own products.");
      return;
    }

    await deleteDoc(doc(db, "products", product.id));
    alert("Product deleted!");
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: product.imageUrl }} style={{ width: "100%", height: 200 }} />
      <Text style={{ fontSize: 24 }}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>${product.price}</Text>
      <Text>Category: {product.category}</Text>
      
      {auth.currentUser.uid === product.userId && (
        <Button title="Delete" onPress={handleDelete} />
      )}
    </View>
  );
}
