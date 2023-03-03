import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ProgressBar from "../displays/ProgressBar";
import SearchBar from "../touchables/SearchBar";
import DeckTitle from "../layout/DeckTitle";

const styles = StyleSheet.create({
    Container: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10
    },
    ProgBar: {
        width: '60%',
        borderWidth: 1, 
        borderColor: "blue",
        height: 160,
        marginLeft: "20%"
    }
})

/**
 * A component that contains all the scrollable content of the homepage.
 */
const HomeCard = (props) => {

    return (
        <ScrollView style = {styles.Container}>
            <ProgressBar />
            <View style = {styles.Container}>
                <SearchBar />
                { props.decks.map((deck, idx) => <DeckTitle deck = {deck} key = {idx}/>)}
                { props.children }
            </View>
        </ScrollView>
    )
}

export default HomeCard