import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';

/**
 * This card displays a deck in card form
 * for the "most recent" section of the Decks page.
 * @param { Deck} Deck - the deck to be rendered in the card.
 * @param { StyleSheet } style - the style to be applied to the card.  
 * @returns 
 */
const DeckCard = (props) => {
    const card = StyleSheet.create({
        card: {
            aspectRatio: 1,
            width: "100%",
            borderRadius: 7
        }
    })

    return (
        <TouchableOpacity style = {props.style}>
            <Card style = {card}>
                <Card.Title title={props.deck.name} subtitle = {props.deck.lastStudied} />
                <Card.Content>
                    <Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Eaque, laudantium nisi?
                    </Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default DeckCard;