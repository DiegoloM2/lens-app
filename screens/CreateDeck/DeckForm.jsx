import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import Input from "../../components/forms/Input";
import * as Yup from "yup";
import { Headline } from "react-native-paper";
import Dropdown from "../../components/forms/Dropdown";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  }
});

const mockParentDecks = [
    {label: "phyiscs", value: 1},
    {label: "mathematics", value: 2}
]


const DeckForm = ({ initialValues = { name: "", description: "", parent_deck: "" }, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    parent_deck: Yup.string(),
  });

  return (
    <View style={styles.container}>
        <Headline style = {{textAlign:"center"}}>Create a Deck!</Headline>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create Deck</Text>
            </TouchableOpacity>
          </>
        )}
        </Formik>
    </View>
  );
};

export default DeckForm;