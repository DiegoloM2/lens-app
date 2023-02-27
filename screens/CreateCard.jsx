import React from "react";
import { ScrollView, View } from "react-native";
import NavBar from "../components/layout/NavBar";
import CardForm from "../components/forms/CardForm";
  

export default CreateCard = () => {
    return (
      <View>
        <NavBar />
        <ScrollView>
            <CardForm />
        </ScrollView>
      </View>)
}