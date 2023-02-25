import React, { useContext, useState } from "react";
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
import AuthContext from "../contexts/AuthContext";
import Link from "../components/touchables/Link";
import {  View, StyleSheet, ScrollView} from "react-native";
import { shadowStyle } from "../utils/styles";
import { Button, Text, TextInput } from "react-native-paper";
import InputEmail from "../components/forms/InputEmail";
import InputPassword from "../components/forms/InputPassword";
import Input from "../components/forms/Input";
import { styles, loginValidation } from "./Login";


const usernameValidation = Yup.object().shape({
  username: Yup.string().required("Username is required")
})
const registerValidation = loginValidation.concat(usernameValidation)


/**
 * This is a function written to handle the submit of the login form.
 * @param { Array } values - takes in form values  
 * @param { AuthContext } auth - takes in auth context to login the user 
 */
const handleRegisterForm = async (values, auth) => {
  let response = await auth.loginUser(values.email,  values.password);
  /* Production: 
  if (response.status == 400) {
    let data = await response.json();
    if (data.non_field_errors) {
      alert(data.non_field_errors[0])
    } else {
      if (data.email) {
        alert(data.email[0])
      }
      if (data.password) {
        alert(data.password)
      }
    }
  }*/
}




const RegisterForm = () => {
    const auth = useContext(AuthContext);

    return (
      <Formik
        initialValues={{password: '', email: '', username: ""} }
        validationSchema={registerValidation}
        onSubmit={(values) => {handleRegisterForm(values, auth)}}
     >
      { props => (
        <ScrollView style = {[styles.form, shadowStyle.boxShadow]}>
          <Text style = {styles.formTitle}>Login</Text>
          
          <InputEmail value = {props.values.email} onChangeText = {props.handleChange("email")} errors = {props.errors.email}/>
          <InputPassword value = {props.values.password} onChangeText = {props.handleChange("password")} errors = {props.errors.password} />
          <Input
            name = "username" 
            label = 'Username' 
            placeholder = "ToñeteIsAGod"
            left={<TextInput.Icon icon = "alien" />}
            value = {props.values.username}
            onChangeText = {props.handleChange("username")}
            errors = {props.errors.username}
            />
              
          <Button mode = "contained" disabled = {!props.isValid}>Register</Button>

              <Link to = "BottomNav" style = { styles.registerLink } screen = "Login">
                Login here
              </Link>

        </ScrollView >
      )}
      </Formik>
    );
};

const Register= () => (
    <View>
        <RegisterForm  />
    </View>
)



export default Register