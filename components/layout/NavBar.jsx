import * as React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { Appbar, Avatar } from 'react-native-paper';

export default function NavBar() {
  const navigation = useNavigation();
  return (
  <View>
   <Appbar.Header style={styles.container}>    
   <Avatar.Icon size={37} icon="alien" style={styles.avatar}/> 
    <Appbar.Content text = ""/>       
    <Appbar.Action icon="fire-circle" color="orange" style = {styles.icon} onPress={() => alert("Cooming soon! Be patient")} />    
    <Text style={styles.text}>77</Text>
    <Appbar.Action icon="book-open-variant" style = {styles.icon} onPress={() => navigation.navigate("Study")} />  
    <Text style={styles.text}>10</Text>
   </Appbar.Header>
   </View>
  );
}

const styles = ({  
  text: {
    fontSize: 15,
    flex:0.2,
    padding: 0,
    margin: 0,
    right: 2,
    color: "black",
    fontWeight: "bold"
  },
  container: {
    justifyContent: "space-evenly",
  },
  avatar: {
   left: 10,
  },
  icon: {
    margin: 0
  }
});

