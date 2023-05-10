import React, {useState, useEffect} from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import IconTextContainer from './IconTextContainer';
import { useNavigation } from '@react-navigation/native';
import { getDeckCards } from '../../store/storage';

/**
 * This card displays a deck in card form
 * for the "most recent" section of the Decks page.
 * @param { Deck} Deck - the deck to be rendered in the card.
 * @param { StyleSheet } style - the style to be applied to the card.  
 * @returns 
 */


const DeckCard = (props) => {
    const navigator = useNavigation();
    var deck = props.deck;
    deck.cards = [];

    const [deckWithCards, setDeckWithCards] = useState({ ...props.deck, cards: [] });

    useEffect(() => {
        const fetchDeckCards = async () => {
            const cards = await getDeckCards(props.deck);
            setDeckWithCards({ ...props.deck, cards });
        };

        fetchDeckCards();
    }, [props.deck]);
    
    const styles = StyleSheet.create({
        card: {
            height: '100%',
            borderRadius: 7,
            backgroundColor: "white",
            flexGrow: 1,
        },
        title: {
            fontWeight: "bold",
            fontSize: 25
        },
        subtitle: {
            color: "rgba(0,0,0,0.4)",
            fontSize: 17,
        },
        cardContent: {
            alignItems: "center",
            height: "73%",
            width: "100%",
            paddingHorizontal: 0,
            paddingVertical: 0
            
        },
        statsContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center", 
            height: "100%",
            width: "100%",
            marginTop: 10,
        },
        infoContainer: {
            justifyContent: "space-around",
            marginLeft: 20,
        }

    })
    return ( 
            <Card style = {styles.card}>
                <Card.Title
                style = {{marginTop: 10}}
                 title={props.deck.title} titleStyle = { styles.title }
                 subtitle = {props.deck.description } subtitleStyle = { styles.subtitle }
                  />
                <Card.Content style = {styles.cardContent}>
                    <View style = {styles.statsContainer}>
                        <ProgressBar size = {170} done = {100}/>
                        <View style = {styles.infoContainer}>
                            <IconTextContainer 
                                icon = "book-open-variant" label = "last studied"
                                value = {"today"} iconStyle = {{color: "green"}} />
                            <IconTextContainer 
                                icon = "cards-outline" label = 'num of cards'
                                value = {deckWithCards.cards.length} iconStyle = {{color: "orange"}} />

                                
                        </View>
                    </View>
                    <Card.Actions style = {{alignSelf: "flex-end", top: 15, }}>
                        <Button onPress = {() => {navigator.navigate("Study")}}>
                                    Study
                            </Button>
                        <Button onPress = {() => {navigator.navigate("DeckEdit", {deck: deckWithCards})}}>
                            Edit
                        </Button>
                    </Card.Actions>
                </Card.Content>
            </Card>
    )
}

export default DeckCard;