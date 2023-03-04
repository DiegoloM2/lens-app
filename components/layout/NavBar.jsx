import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';



import { Appbar, Avatar } from 'react-native-paper';

export default function NavBar({navigation}) {
  return (
  <SafeAreaView>
   <Appbar.Header style={styles.container}>    
   <Avatar.Icon size={30} icon="alien" style={styles.avatar}/> 
    <Appbar.Content text = ""/>       
    <Appbar.Action icon="fire-circle" color="orange" onPress={() => Alert.alert("Cooming soon! Be patient")} />    
    <Text style={styles.text}>77</Text>
    <Appbar.Action icon="book-open-variant" onPress={() => navigation.navigate("Study")} />  
    <Text style={styles.text}>10</Text>
   </Appbar.Header>
   </SafeAreaView>
  );
}

const styles = ({  
  text: {
    fontSize: 15,
    flex:0.2,
  },
  container: {
    justifyContent: "space-evenly",
    padding: 10,
  },
  avatar: {
   left: 10,
  }
});

