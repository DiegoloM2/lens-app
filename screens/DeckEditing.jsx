import React, {useState} from "react";
import { ScrollView, View, Text } from "react-native";
import DeckInfoEditing from "../components/forms/DeckEditInfo";
import LinkSearchBar from "../components/touchables/LinkSearchBar";
import { useNavigation } from "@react-navigation/core";
import CreateButton from "../components/touchables/CreateButton";
import CardPreview from "../components/layout/CardPreview";
import { Searchbar } from "react-native-paper";

export default function DeckEditing({ route }) {
  const { deck } = route.params;
  const navigator = useNavigation();

  const [filteredCards, setFilteredCards] = useState(deck.cards);
  const [searchQuery, setSearchQuery] = useState("");
  
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setFilteredCards(
      deck.cards.filter((card) =>
        (card.question && card.question.toLowerCase().includes(query.toLowerCase())) ||
        (card.answer && card.answer.toLowerCase().includes(query.toLowerCase()))
      )
    );
  };
  return (
    <View>
    <ScrollView style={styles.container}>

      <DeckInfoEditing title = { deck.title } description = { deck.description } />

      <Searchbar placeholder = "Search your cards here" style = {{
        marginBottom: 10, marginTop: 15, marginHorizontal:0, padding: 0, backgroundColor: "white"}} 
        onChangeText = {onChangeSearch}
        />
      {
        filteredCards.slice(0, 10).map((card, idx) => (
          <CardPreview card = {card} key = {idx}>{card.question}</CardPreview>
        ))
      }
    </ScrollView>
    <CreateButton onPress = {() => {navigator.navigate("CreateCard", {deck: deck})} }/>

    </View>
  );
}


const styles = {

  container: {
    padding: 16,
    height: "100%",
  }


}