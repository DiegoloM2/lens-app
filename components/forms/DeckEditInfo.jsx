import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from "react-native";


/**
 * A simple form to edit a Deck's title and description.
 */
const DeckEditInfo = ({ title, description}) => {
  const [titleValue, setTitle] = useState(title);
  const [descriptionValue, setDescription] = useState(description);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        value={titleValue}
        onChangeText={setTitle}
        onSubmitEditing = {() => {Alert.alert(`New title is ${titleValue}`)}}
      />
      <TextInput
        style={styles.descriptionInput}
        value={descriptionValue}
        onChangeText={setDescription}
        multiline={true}
        onSubmitEditing = {() => {Alert.alert(`New description is ${descriptionValue}`)}}

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
