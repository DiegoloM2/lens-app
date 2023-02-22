import * as React from 'react';
import { Text } from 'react-native';


import { Appbar, Avatar } from 'react-native-paper';

export default function NavBar() {
  return (
   <Appbar.Header>    
    <Avatar.Text size={30} label="FB" color="green"/> 
    <Appbar.Content text = ""/>       
    <Appbar.Action icon="fire-circle" />
    <Text style={styles.text}>77</Text>
    <Appbar.Action icon="bookshelf"  />
    <Text style={styles.text}>10</Text>
   </Appbar.Header>
  );
}

const styles = ({
   text: {
    color: "#fff",
     fontSize: 15,
   },
});
