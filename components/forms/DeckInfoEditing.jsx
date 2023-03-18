import * as React from 'react';
import {View, TextInput} from "react-native";

export default function DeckInfo() {

return (
     <View>
     <TextInput
     style = {styles.deckname}
     placeholder= "Deck name"
     />
     <TextInput
     style = {styles.deckdescription}
     placeholder='Deck description'
     />
     </View>
);

};

const styles = {
deckname: {
  left: 15,
  padding: 15,
  borderBottomWidth: .5,
  width: 300,
  fontSize: 18,
  
  
},
deckdescription: {
    left: 15,
    padding: 15,
    borderBottomWidth: .5,
    width: 300,
   
}
}