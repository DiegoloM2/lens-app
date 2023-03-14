import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import DeckCard from "../components/displays/DeckCard";
import NavBar from "../components/layout/NavBar";
import { TestDecks } from "../utils/testData.jsx";
import { shadowStyle } from "../utils/styles";
import SearchBar from "../components/touchables/SearchBar";


const styles = StyleSheet.create({
    deckCardsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10
    },
    deckCard: {
        flex: 1,
        marginHorizontal: 3,
    },
    container: {
        marginVertical: 10,
        marginHorizontal: 7,
        padding: 10,
        borderRadius: 15,
    },
    containerTitle: {
        color: "rgba(0,0,0,0.7)",
        fontWeight: "bold",
        fontSize: 13,
        marginBottom: 5,
        marginLeft: 5,
    }
})

export default function Deck () {
    return <View>
        <NavBar />

        <ScrollView>
            <SearchBar />
            <View style = {[styles.container, shadowStyle]}>
                <Text style = {styles.containerTitle}>Recent decks</Text>
                <View style = {styles.deckCardsContainer}>
                { TestDecks.slice(0,3).map((deck, idx) => <DeckCard deck = {deck} key = {idx} style = {styles.deckCard}/>)}
                </View>

                <Text style = {styles.containerTitle}>Other decks</Text>


                { TestDecks.slice(3,).map((deck, idx) => <Text deck = {deck} key = {idx} style = {styles.deckCard}>{deck.name}</Text>)}
                
            </View>



        </ScrollView>
    </View>
}