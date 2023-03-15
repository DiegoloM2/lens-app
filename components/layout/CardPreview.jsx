import  React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CardPreview({title}) {
  return (
   <View style={styles.container}>
   <View style={styles.containerText}>
   <Text style={styles.text}>
   {title}
   </Text>
   </View>   
   <TouchableOpacity onPress={() => {}} style={styles.touch}>
   <FontAwesome name="arrow-right" size={24} color="black" />
   </TouchableOpacity>
   </View>
  );
}

const styles = ({
container: {
  flexDirection: "row",
  padding: 10,
  backgroundColor: "#E9E4E2",  
  alingItems: 'center'
},
text: {   
  fontSize: 15,
  color: "#000",
},
touch: {
  flex:0.2,
},
containerText: {
  flex:2,
  justifyContent: "center",
}
})