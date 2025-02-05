import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput 
        placeholder="Search by category..." 
        value={search} 
        onChangeText={setSearch} 
        style={{ padding: 10, borderWidth: 1, marginBottom: 10 }}
      />

      <FlatList
        data={products.filter((product) =>
          product.category.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { product: item })}>
            <View style={{ marginBottom: 20 }}>
              <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: 150 }} />
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
        <Text style={{ fontSize: 20, color: "blue" }}>+ Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}
