import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import { Card, Button, Headline, Avatar } from "react-native-paper";
import Dropdown from "./Dropdown";
import { saveDeck } from "../../store/storage";
import AuthContext from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 25
  },
  card: {
    display:"flex", 
    alignItems:"center", 
    justifyContent:"center",
  }
});

const mockParentDecks = [
    {label: "phyiscs", value: 1},
    {label: "mathematics", value: 2}
]

const handleSubmit = async (values, username, navigator) => {
  deck = {
    "title":values.name,
    description: values.description,
    "parent_deck":values.parent_deck,
    owner: username
  }
  await saveDeck(deck);
  navigator.navigate("Decks", {screen: "Deck"})
}

const DeckForm = ({ initialValues = { name: "", description: "", parent_deck: "" }}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    parent_deck: Yup.string(),
  });
  const auth = useContext(AuthContext);
  const navigator = useNavigation();


  return (
    <View style={styles.container}>
      <Card style={{padding:20}}>
        {(props)=>(
          <div style={{width:"100%"}}>
            <Avatar.Icon style={{flexStyle:"center"}} color="white" icon="cards-outline"/>
          </div>
        )()}

        <View style={styles.card}>
          <Avatar.Icon style={{flexStyle:"center"}} color="white" icon="cards-outline"/>
          <Text style={{color:"blue", fontWeight:"bold", fontSize:"20px"}}>Let's build a deck!</Text>
        </View>
        
          <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values, auth.user.username, navigator)} validationSchema={validationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                  label = "Name*"
                  placeholder = 'eg: Math and Physics'
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  errors = {errors.name}
              />
              <Input
                  label = "Description"
                  placeholder = 'A deck for the course 2IT80'
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  multiline={true}
                  errors = {errors.description}
              />
              <Dropdown items = {mockParentDecks} 
                handleChange = { (value) => {handleChange("parent_deck")}} 
                placeholder = "Select a deck" 
                label = "Parent Deck"/>
              <TouchableOpacity style={{marginTop: 25}}>
                <Button style={styles.buttonText} mode = "contained" onPress = {handleSubmit}>Create Deck</Button>
              </TouchableOpacity>
            </>
          )}
          </Formik>
      </Card>
    </View>

  );
};

export default DeckForm;