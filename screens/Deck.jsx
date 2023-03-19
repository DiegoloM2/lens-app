import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import NavBar from "../components/layout/NavBar";
import { TestDecks } from "../utils/testData.jsx";
import SearchBar from "../components/forms/SearchBar";
import { Headline, useTheme } from "react-native-paper";
import CreateButton from "../components/touchables/CreateButton";
import Carousel from "../components/displays/DeckPreviewCarousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinkSearchBar from "../components/touchables/LinkSearchBar";
import { useNavigation } from "@react-navigation/core";




export default function Deck () {
    const theme = useTheme();
    const navigator = useNavigation();

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

    return <SafeAreaView style = {{height: "100%"}}>

        <ScrollView style = {{height: "100%", padding: 10}}>
                 
                <LinkSearchBar
                    placeholder = "Search your decks" 
                    onPress = {() => {navigator.push("Search", {availableDecks: TestDecks })}}/>
            <View style = {{marginTop: 25}}>
                <Carousel decks = {TestDecks} /> 
            </View>

        </ScrollView>
        <CreateButton label = "Create Deck" to = "Create Deck"/>

    </SafeAreaView>
}