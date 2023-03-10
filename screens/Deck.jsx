import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import DeckCard from "../components/displays/DeckCard";
import NavBar from "../components/layout/NavBar";
import { TestDecks } from "../utils/testData.jsx";


const styles = StyleSheet.create({
    deckCardsContainer: {
        marginTop:15,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    deckCard: {
        flex: 1,
        margin: 15,
        height: 130
    }
})

export default function Deck () {
    return <View>
        <NavBar />

        <ScrollView>
            <View style = {styles.deckCardsContainer}>
                { TestDecks.slice(0,2).map((deck, idx) => <DeckCard deck = {deck} key = {idx} style = {styles.deckCard}/>)}
            </View>
        </ScrollView>
    </View>
}