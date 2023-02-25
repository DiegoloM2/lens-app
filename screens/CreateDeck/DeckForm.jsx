import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import Input from "../../components/forms/Input";
import * as Yup from "yup";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007aff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const DeckForm = ({ initialValues = { name: "", description: "", parent_deck: "" }, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    parent_deck: Yup.string(),
  });

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Input
                label = "Name"
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
            />
            {touched.description && errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}
            <Text style={styles.label}>Parent Deck</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("parent_deck")}
              onBlur={handleBlur("parent_deck")}
              value={values.parent_deck}
            />
            {touched.parent_deck && errors.parent_deck && (
              <Text style={styles.error}>{errors.parent_deck}</Text>
            )}
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