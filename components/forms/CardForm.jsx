import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import { Button, Headline } from "react-native-paper";
import Dropdown from "./Dropdown";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  }
});

const mockDecks = [
    {label: "phyiscs", value: 1},
    {label: "mathematics", value: 2}
]


const CardForm = ({ initialValues = { question: "", answer: "", deck: ""}, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
    deck: Yup.string("A deck for the card is required"),
  });

  return (
    <View style={styles.container}>
        <Headline style = {{textAlign:"center"}}>Create a Card!</Headline>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Input
                label = "Question*"
                placeholder = 'eg: Who is the real god?'
                onChangeText={handleChange("question")}
                onBlur={handleBlur("question")}
                value={values.name}
                errors = {errors.name}
                multiline = {true}
            />
            <Input
                label = "Answer*"
                placeholder = 'Tonete'
                onChangeText={handleChange("answer")}
                onBlur={handleBlur("answer")}
                value={values.description}
                multiline={true}
                errors = {errors.description}
            />
            <Dropdown items = {mockDecks} 
              handleChange = { (value) => {handleChange("deck")}} 
              placeholder = "Select a deck" 
              label = "Deck*"/>
            <TouchableOpacity style={{marginTop: 25}} onPress={handleSubmit}>
              <Button style={styles.buttonText} mode = "contained">Create Card</Button>
            </TouchableOpacity>
          </>
        )}
        </Formik>
    </View>
  );
};

export default CardForm;