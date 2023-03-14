import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import NavBar from "../components/layout/NavBar";
import DeckForm from "../components/forms/DeckForm";
  

export default CreateDeck = () => {
  const styles = StyleSheet.create({
    Container: {
        backgroundColor: "white",
        height:"100%"
    }
  })
    return (
      <View>
        <NavBar />
        <ScrollView style = {styles.Container}>
            <DeckForm />
        </ScrollView>
      </View>
    )
}