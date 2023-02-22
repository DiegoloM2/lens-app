import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DeckTitle() {
  return (
    <View style={styles.container}>     
     <Text style={styles.text}> Deck name </Text>
     <TouchableOpacity onPress={() => {}}> 
     <Ionicons name="add-circle" size={35}/>
     </TouchableOpacity>
    
      <TouchableOpacity onPress={() => {}}>
      <Ionicons name="create" size={35}/>
      </TouchableOpacity>
    </View>
  );
}

const styles =({
  container: {
    flexDirection: "row",
    backgroundColor: "powderblue",
    padding: 15,    
  },
  text: {
    alingSelf: "center",
    fontSize: 40,
    color: "#fff",    
    fontFamily: "sans-sherif",
    flex: 1,
  },
})