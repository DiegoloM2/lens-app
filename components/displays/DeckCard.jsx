import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
/**
 * This card displays a deck in card form
 * for the "most recent" section of the Decks page.
 * @param { Deck} Deck - the deck to be rendered in the card.
 * @param { StyleSheet } style - the style to be applied to the card.  
 * @returns 
 */
const DeckCard = (props) => (
  <Card style = {props.style}>
    <Card.Title title={props.deck.name} subtitle = {props.deck.lastStudied} left={LeftContent} />
    <Card.Content>
        <Text>{ props.deck.description }</Text>
    </Card.Content>
    <Card.Actions>
      <Button>Study</Button>
    </Card.Actions>
  </Card>
);

export default DeckCard;