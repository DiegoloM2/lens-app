import React from "react";
import { ScrollView, View, Text } from "react-native";
import DeckInfoEditing from "../components/forms/DeckEditInfo";
import LinkSearchBar from "../components/touchables/LinkSearchBar";
import { useNavigation } from "@react-navigation/core";
import CreateButton from "../components/touchables/CreateButton";
import CardPreview from "../components/layout/CardPreview";

export default function DeckEditing({ route }) {
  const { deck } = route.params;
  const navigator = useNavigation();

  return (
    <View>
    <ScrollView style={styles.container}>

      <DeckInfoEditing title = { deck.title } description = { deck.description } />

      <LinkSearchBar placeholder = "Search your cards here" style = {{marginBottom: 10, marginTop: 15, marginHorizontal:0, padding: 10}} />
      {
        deck.cards.slice(0, 10).map((card) => (
          <CardPreview card = {card}>{card.question}</CardPreview>
        ))
      }
    </ScrollView>
    <CreateButton />

    </View>
  );
}


const styles = {

  container: {
    padding: 16,
    height: "100%",
  }


}