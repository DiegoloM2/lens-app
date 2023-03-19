import React from "react";
import { View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinkSearchBar from "../components/touchables/LinkSearchBar";
import DeckInfoEditing from "../components/forms/DeckInfoEditing";
import CardDiv from "../components/layout/CardDiv";
import { useNavigation } from "@react-navigation/core";
import { TestDecks } from "../utils/testData";

export default function DeckEditing() {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <LinkSearchBar placeholder={"Search your cards here"} onPress = {() => {navigator.navigate("Search", {availableDecks: TestDecks})} } />
      <DeckInfoEditing />
      <CardDiv />
    </SafeAreaView>
  );
}


const styles = {

  container: {
    padding: 10,
  }


}