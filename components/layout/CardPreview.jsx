import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CardPreview() {
  return (
   <View style={styles.container}>
   <View style={styles.containerText}>
   <Text style={styles.text}>
   Card Preview
   </Text>
   </View>
   <TouchableOpacity onPress={() => {}} style={styles.touch}>
   <FontAwesome name="pencil" size={35}/>
   </TouchableOpacity>
   <TouchableOpacity onPress={() => {}} style={styles.touch}>
   <FontAwesome name="trash" size={35}/>
   </TouchableOpacity>
   </View>
  );
}

const styles = ({
container: {
  flexDirection: "row",
  padding: 10,
  backgroundColor: "red",
  borderRadius: 13,
  justifyContent: 'center'
},
text: {  
  fontSize: 35,
  color: "#fff",
},
touch: {
  flex:0.4,
},
containerText: {
  flex:2,
}
})