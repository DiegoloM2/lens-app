import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import IconTextContainer from './IconTextContainer';
import { useNavigation } from '@react-navigation/native';

/**
 * This card displays a deck in card form
 * for the "most recent" section of the Decks page.
 * @param { Deck} Deck - the deck to be rendered in the card.
 * @param { StyleSheet } style - the style to be applied to the card.  
 * @returns 
 */


const DeckCard = (props) => {
    const navigator = useNavigation();
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
                        <ProgressBar size = {170} />
                        <View style = {styles.infoContainer}>
                            <IconTextContainer 
                                icon = "book-open-variant" label = "last studied"
                                value = {props.deck.lastStudied} iconStyle = {{color: "green"}} />
                            <IconTextContainer 
                                icon = "cards-outline" label = 'num of cards'
                                value = {props.deck.studiedCards} iconStyle = {{color: "orange"}} />

                                
                        </View>
                    </View>
                    <Card.Actions style = {{alignSelf: "flex-end", top: 15, }}>
                        <Button onPress = {() => {navigator.navigate("Study")}}>
                                    Study
                            </Button>
                        <Button>
                            Edit
                        </Button>
                    </Card.Actions>
                </Card.Content>
            </Card>
    )
}

export default DeckCard;