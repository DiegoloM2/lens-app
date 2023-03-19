import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Menu } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AuthContext from "../../contexts/AuthContext"


import { Appbar, Avatar } from 'react-native-paper';


const ProfileMenu = () => {
  const auth = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu 
    visible={visible}
    onDismiss={closeMenu}
    anchor={<Appbar.Action size={33} color = "white" icon="alien" style={styles.avatar} onPress = {() => openMenu()}/> }
    >
      <Menu.Item onPress={() => {auth.logoutUser(); closeMenu();}} title="Logout" />

    </Menu>
  )

}


export default function NavBar() {
  const navigation = useNavigation();
  return (
  <View>
   <Appbar.Header style={styles.container}>    
    <ProfileMenu />
    <View style = {{flexDirection: "row", alignItems: "center", justifyContent: 'flex-end'}}>
      <Appbar.Action icon="fire-circle" color="orange" style = {styles.icon} onPress={() => alert("Cooming soon! Be patient")} />    
      <Text style={styles.text}>77</Text>
      <Appbar.Action icon="book-open-variant" style = {styles.icon} onPress={() => navigation.navigate("Study")} />  
      <Text style={styles.text}>10</Text>
    </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  avatar: {
   backgroundColor: "blue",

  },
  icon: {
    margin: 0
  }
});

