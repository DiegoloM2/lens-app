import React, {useEffect, useState} from "react";
import { ScrollView, View, Text } from "react-native";
import DeckInfoEditing from "../components/forms/DeckEditInfo";
import LinkSearchBar from "../components/touchables/LinkSearchBar";
import { useNavigation } from "@react-navigation/core";
import CreateButton from "../components/touchables/CreateButton";
import CardPreview from "../components/layout/CardPreview";
import { Searchbar } from "react-native-paper";
import { getDeckCards } from "../store/storage";

export default function DeckEditing({ route }) {
  const { deck } = route.params;
  const navigator = useNavigation();
  const [filteredCards, setFilteredCards] = useState(deck.cards);
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (filteredCards) {
      setFilteredCards(
        filteredCards.filter((card) =>
          (card.question && card.question.toLowerCase().includes(query.toLowerCase())) ||
          (card.answer && card.answer.toLowerCase().includes(query.toLowerCase()))
        )
      );
    }
  };

  const effect = async () => {
    if (!filteredCards) {
      setFilteredCards(await getDeckCards(deck));
    }
  }
  useEffect(() => {effect()}, [deck])

  return (
    <View>
    <ScrollView style={styles.container}>

      <DeckInfoEditing deck = {deck} />

      <Searchbar placeholder = "Search your cards here" style = {{
        marginBottom: 10, marginTop: 15, marginHorizontal:0, padding: 0, backgroundColor: "white"}} 
        onChangeText = {onChangeSearch}
        />
      {
        filteredCards ? filteredCards.slice(0, 10).map((card, idx) => (
          <CardPreview card = {card} key = {idx}>{card.question}</CardPreview>
        )): ""
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