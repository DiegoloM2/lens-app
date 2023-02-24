import * as React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { Appbar, Avatar } from 'react-native-paper';

export default function NavBar() {
  return (
   <Appbar.Header style={styles.container}>    
    <Avatar.Image size={30} source={require("../assets/Profile-Avatar.png")}/> 
    <Appbar.Content text = ""/>       
    <Appbar.Action icon="fire-circle" color="orange" />    
    <Text style={styles.text}>77</Text>
    <TouchableWithoutFeedback>
    <MaterialCommunityIcons name="book-open-variant" size={25} color = "dark-grey"/>
    </TouchableWithoutFeedback>    
    <Text style={styles.text_}>10</Text>
   </Appbar.Header>
  );
}

const styles = ({
   text_: {
    color: "#fff",
     fontSize: 15,
     flex:0.2,
     padding: 7
   },
   text: {
    color: "#fff",
     fontSize: 15,
     flex:0.2,
   },
   container: {
     justifyContent: "space-evenly",
   }
});
