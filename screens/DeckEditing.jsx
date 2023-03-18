import React from "react";
import { View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/forms/SearchBar";
import DeckInfoEditing from "../components/forms/DeckInfoEditing";
import CardDiv from "../components/layout/CardDiv";

export default function DeckEditing() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar placeholder={"Search your cards here"} />
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