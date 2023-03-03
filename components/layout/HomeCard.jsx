import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import ProgressBar from "../displays/ProgressBar";
import SearchBar from "../touchables/SearchBar";
import DeckTitle from "../layout/DeckTitle";


/**
 * A component that contains all the scrollable content of the homepage.
 */
const HomeCard = (props) => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        Container: {
            marginHorizontal: 20,
            marginTop: 15,
            padding: 10
        },
        DeckContainer: {
            marginTop: 20,
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

          backgroundColor: theme.colors.background,
        }
    })
    

    return (
        <ScrollView style = {styles.Container}>
            <ProgressBar />
            <View style = {styles.DeckContainer}>
                <SearchBar />
                { props.decks.map((deck, idx) => <DeckTitle deck = {deck} key = {idx}/>)}
                { props.children }
            </View>
        </ScrollView>
    )
}

export default HomeCard