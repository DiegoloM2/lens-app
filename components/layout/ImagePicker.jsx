import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Button, Image } from "react-native";

export default function TakePhoto() {
  const [image, setImage] = useState("https://via.placeholder.com/200");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }

  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />     
      <Button title="Pick an image now from camera" onPress={takeImage} /> 
      
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
         
    </View>
  );
}
