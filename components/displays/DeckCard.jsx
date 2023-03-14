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
    const styles = StyleSheet.create({
        card: {
            aspectRatio: 1,
            width: "100%",
            borderRadius: 7
        },
        title: {
            fontWeight: "bold",
            fontSize: 14
        },
        subtitle: {
            color: "rgba(0,0,0,0.4)",
            fontWeight: "bold",
            fontSize: 10,
            bottom:10
        },
        cardContent: {
            bottom: 15,
            fontSize: 10
        },

    })

    return ( 
        <TouchableOpacity style = {props.style}>
            <Card style = {styles.card}>
                <Card.Title
                 title={props.deck.name} titleStyle = { styles.title }
                 subtitle = {`${props.deck.lastStudied}`} subtitleStyle = { styles.subtitle }
                  />
                <Card.Content>
                    <Text style = {styles.cardContent} numberOfLines = {3}>
                        { props.deck.description }
                    </Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default DeckCard;