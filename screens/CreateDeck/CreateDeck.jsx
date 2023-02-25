import React from "react";
import { ScrollView, View } from "react-native";
import NavBar from "../../components/layout/NavBar";
import DeckForm from "./DeckForm";
  

export default CreateDeck = () => {
    return (
      <View>
        <NavBar />
        <ScrollView>
            <DeckForm />
        </ScrollView>
      </View>)
}