import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import DeckCard from "../components/displays/DeckCard";
import NavBar from "../components/layout/NavBar";
import { TestDecks } from "../utils/testData.jsx";


const styles = StyleSheet.create({
    deckCardsContainer: {
        marginVertical: 10,
        marginHorizontal: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        borderRadius: 15,
        elevation: 10
    },
    deckCard: {
        flex: 1,
        marginHorizontal: 7,
    }
})

export default function Deck () {
    return <View>
        <NavBar />

        <ScrollView>
            <Text>Most recent</Text>
            <View style = {styles.deckCardsContainer}>
                { TestDecks.slice(0,).map((deck, idx) => <DeckCard deck = {deck} key = {idx} style = {styles.deckCard}/>)}
            </View>
        </ScrollView>
    </View>
}