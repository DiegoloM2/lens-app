import  React, {useState} from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import {  Surface, Menu } from 'react-native-paper';


const CardMenu = ({ onDelete }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDelete = () => {
    onDelete();
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<TouchableOpacity onPress={() => {openMenu()}} style={styles.touch}>
      <Text style = {styles.settingsButton}>...</Text>
      </TouchableOpacity>}
    >
      <Menu.Item onPress={handleDelete} title="Delete" />
    </Menu>
  );
};


export default function CardPreview({card }) {
  return (
   <Surface style={styles.container} elevation = {5}>
    <View style = {styles.questionContainer}>
      <Text style={styles.question}>
        {card.question}
      </Text>
      <Text style={styles.lastStudied}>
        last studied · {card.lastStudied}
      </Text>

   </View>
   <TouchableOpacity onPress={() => {}} style={styles.touch}>
    <CardMenu onDelete = {() => {Alert.alert("card has been deleted")}}/>
    </TouchableOpacity>
   </Surface>
  );
}

const styles = ({
container: {
  flex: 1,
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: "space-between",
  borderRadius: 5,
  borderColor: "lightgrey",
  marginTop: 7,
  paddingVertical: 5,
  paddingHorizontal: 10,
},
questionContainer: {
  paddingBottom: 3,
  paddingRight: 10 ,
},
question: {   
  fontSize: 15,
  color: "rgba(0,0,0,0.7)",
  fontWeight: "bold"
},
lastStudied: {
  fontSize: 11,
  color: "rgba(0,0,0,0.3)",
  fontWeight: "bold",
  marginTop: 3,
},
settingsButton: {
  fontSize: 30,
  bottom: 10,
  marginRight: 13,
  color: "rgba(0,0,0,0.45)",
},
containerText: {
  flex:2,
  justifyContent: "center",
}
})