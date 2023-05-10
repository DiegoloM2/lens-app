import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from "react-native";
import { useDecks } from '../../contexts/DeckContext';


/**
 * A simple form to edit a Deck's title and description.
 */
const DeckEditInfo = ({ deck }) => {
  const [titleValue, setTitle] = useState(deck.title);
  const [descriptionValue, setDescription] = useState(deck.description);

  const { handleUpdateDeck } = useDecks();

  const handleEditDeck = ({title = null, description = null}) => {
    if (title) deck.title = title;
    if (description) deck.description = description;
    handleUpdateDeck(deck); 
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        value={titleValue}
        onChangeText={setTitle}
        onSubmitEditing = {() => {handleEditDeck({ title: titleValue, description: descriptionValue})}}
      />
      <TextInput
        style={styles.descriptionInput}
        value={descriptionValue}
        onChangeText={setDescription}
        multiline={true}
        onSubmitEditing = {() => {handleEditDeck({ title: titleValue, description: descriptionValue})}}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 15,
    borderBottomWidth: 0.3,
    borderColor:  "lightgrey",
    paddingBottom: 5
  },
  titleInput: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionInput: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.5)',
  },
});

export default DeckEditInfo;
