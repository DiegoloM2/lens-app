import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import Input from "../Input";
import * as Yup from "yup";
import { Button, Headline, Avatar, Surface } from "react-native-paper";
import Dropdown from "../Dropdown";
import { TestDecks } from "../../../utils/testData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
    borderRadius: 10,
    padding: 20,
    margin: 15,
    marginTop: 40
  },
});

const decks = TestDecks.map((deck) => ({label: deck.title, value: deck.id}))

const CardForm = ({ initialValues = { question: "", answer: "", deck: null}, onSubmit, deck }) => {
  const validationSchema = Yup.object().shape({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
    deck: Yup.string("A deck for the card is required"),
  });

  return (
    <Surface style={styles.container}>
        <Avatar.Icon icon = "cards-playing-heart-multiple-outline" size = {45} style = {{alignSelf: "center"}}/>
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
                style = {styles.input}
            />
            <Input
                label = "Answer*"
                placeholder = 'Tonete'
                onChangeText={handleChange("answer")}
                onBlur={handleBlur("answer")}
                value={values.description}
                multiline={true}
                errors = {errors.description}
                style = {styles.input}
            />
            <Dropdown items = {decks} 
              value = {deck.id}
              handleChange = { (value) => {handleChange("deck")}} 
              placeholder = "Select a deck" 
              label = "Deck*"/>
            <TouchableOpacity style={{marginTop: 25}} onPress={handleSubmit}>
              <Button style={styles.buttonText} mode = "contained">Create Card</Button>
            </TouchableOpacity>
          </>
        )}
        </Formik>
    </Surface>
  );
};

export default CardForm;