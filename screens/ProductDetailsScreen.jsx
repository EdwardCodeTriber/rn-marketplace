import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

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
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>

      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  productName: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 16,
    marginVertical: 10,
    color: "#888",
  },
});

