import React from "react";
import { View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/touchables/SearchBar";
import DeckInfoEditing from "../components/forms/DeckInfoEditing";
import CardDiv from "../components/layout/CardDiv";

export default function DeckEditing() {
  return (
    <SafeAreaView >
      <SearchBar placeholder={"Search your cards here"} />
      <DeckInfoEditing />
      <CardDiv />
    </SafeAreaView>
  );
}


