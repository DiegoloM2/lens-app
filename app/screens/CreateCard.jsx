import React from "react";
import { ScrollView, View } from "react-native";
import NavBar from "../components/layout/NavBar";
import CardForm from "../components/forms/CardForm/CardForm";
  

export default CreateCard = ({ route }) => {
    const { deck } = route.params;
    return (
      <View>
        <ScrollView>
            <CardForm deck = {deck}/>
        </ScrollView>
      </View>)
}