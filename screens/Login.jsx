import React, { useContext, useState } from "react";
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
import AuthContext from "../contexts/AuthContext";
import Link from "../components/touchables/Link";
import {  View, StyleSheet, Alert} from "react-native";
import { shadowStyle } from "../utils/styles";
import { Button, HelperText, Text } from "react-native-paper";
import InputEmail from "../components/forms/InputEmail";
import InputPassword from "../components/forms/InputPassword";
import { useNavigation } from "@react-navigation/native";

/**
 * This is the object that contains the validation of the login form.
 */
export const loginValidation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(8, "password must contain at least 8 characters.")
        .required("Required")
  })

/**
 * This is a function written to handle the submit of the login form.
 * @param { Array } values - takes in form values  
 * @param { AuthContext } auth - takes in auth context to login the user 
 */
const handleLoginForm = async (values, auth, navigator, actions) => {
  let response = await auth.loginUser(values.email,  values.password);
  if (!response) {
    actions.setStatus("The credentials you entered do not correspond to any user.");
    actions.setSubmitting(false);
  } else {
    Alert.alert("Logged in succesfully!")
  }
};

export const styles = StyleSheet.create({
    form: {
      backgroundColor:"white",
      marginVertical: 150,
      marginHorizontal: 20,
      flexDirection: "column",
      borderRadius: 15,
      padding: 15,
    },
    formTitle: {
      fontSize: "2em",
      textAlign:"center",
      fontWeight:"bold",
    },
    forgotLink: {
      marginBottom: 20,
      textAlign:"right",
    },
    registerLink: {
      textAlign: "center",
      marginVertical: 20,

    }
  });



const LoginForm = () => {
    const auth = useContext(AuthContext);
    const navigator = useNavigation();

    return (
      <Formik
        initialValues={{password: '', email: '' } }
        validationSchema={loginValidation}
        onSubmit={async (values, actions) => {handleLoginForm(values, auth, navigator, actions)}}
     >
      { props => (
        <View style = {[styles.form, shadowStyle.boxShadow]}>
          <Text style = {styles.formTitle}>Login</Text>

          <InputEmail value = {props.values.email} onChangeText = {props.handleChange("email")} errors = {props.errors.email}/>
          <InputPassword  value = {props.values.password} onChangeText = {props.handleChange("password")} errors = {props.errors.password} />
          {props.status && <HelperText type = 'error' style = {{textAlign: "center"}}>{props.status}</HelperText>}

              
          <Button mode = "contained" disabled = {!props.isValid} onPress = {props.handleSubmit}>LOGIN</Button>

              <Link to = "Register" style = { styles.registerLink }>
                Register here
              </Link>

        </View >
      )}
      </Formik>
    );
};

const Login= () => (
    <View>
        <LoginForm  />
    </View>
)



export default Login