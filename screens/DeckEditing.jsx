import React from "react";
import { View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/touchables/SearchBar";
import DeckInfoEditing from "../components/forms/DeckInfoEditing";
import CardList from "../components/layout/CardList";

export default function DeckEditing() {
  return (
    <SafeAreaView >
      <SearchBar placeholder={"Search your cards here"} />
      <DeckInfoEditing />
      <CardList />
    </SafeAreaView>
  );
}


