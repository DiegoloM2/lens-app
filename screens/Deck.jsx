import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import DeckCard from "../components/displays/DeckCard";
import NavBar from "../components/layout/NavBar";
import { TestDecks } from "../utils/testData.jsx";
import { shadowStyle } from "../utils/styles";
import SearchBar from "../components/touchables/SearchBar";
import { useTheme } from "react-native-paper";
import CreateButton from "../components/touchables/CreateButton";
import Carousel from "../components/displays/DeckPreviewCarousel";




export default function Deck () {
    const theme = useTheme();

    const styles = StyleSheet.create({
        deckCardsContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 10,
        },
        deckCard: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 20

            
        },
        container: {
            marginVertical: 10,
            marginHorizontal: 10,
            padding: 10,
            borderRadius: 15,
            backgroundColor: theme.colors.onPrimary
        },
        containerTitle: {
            color: "rgba(0,0,0,0.7)",
            fontWeight: "bold",
            fontSize: 13,
            marginBottom: 15,
        }
    })

    return <View>
        <NavBar />

        <ScrollView>
            <SearchBar />
            <Carousel decks = {TestDecks.slice(0, 2)} /> 
            {/* <View style = {[styles.container]}>
                <Text style = {styles.containerTitle}>Recent decks</Text>
                <View style = {styles.deckCardsContainer}>
                { TestDecks.slice(0,2).map((deck, idx) => <DeckCard deck = {deck} key = {idx} style = {styles.deckCard}/>)}
                </View>
                </View>
            */}
                
            <View style = {styles.container}>
                <Text style = {styles.containerTitle}>Other decks</Text>


                { TestDecks.slice(2,).map((deck, idx) => <Text deck = {deck} key = {idx} style = {[styles.deckCard, {marginBottom: 30}]}>{deck.title}</Text>)}
            </View>


        </ScrollView>
        <CreateButton label = "Create Deck" to = "Create Deck"/>

    </View>
}