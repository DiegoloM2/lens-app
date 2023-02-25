import React, { useContext, useState } from "react";
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
import AuthContext from "../contexts/AuthContext";
import Link from "../components/touchables/Link";
import {  View, StyleSheet} from "react-native";
import { shadowStyle } from "../utils/styles";
import { Button, Text, TextInput } from "react-native-paper";
import InputEmail from "../components/forms/InputEmail";
import InputPassword from "../components/forms/InputPassword";
import Input from "../components/forms/Input";
import { styles, loginValidation } from "./Login";


const registerValidation = loginValidation

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
        <View style = {[styles.form, shadowStyle.boxShadow]}>
          <Text style = {styles.formTitle}>Login</Text>
          
          <InputEmail value = {props.values.email} onChangeText = {props.handleChange("email")} errors = {props.errors.email}/>
          <InputPassword  value = {props.values.password} onChangeText = {props.handleChange("password")} errors = {props.errors.password} />
          <Input
            name = "username"  
            placeholder = "Toñete"
            left={<TextInput.Icon icon = "email" />}
            value = {props.values.username}
            onChangeText = {props.handleChange("username")}
            />
              
          <Button mode = "contained" disabled = {!props.isValid}>Register</Button>

              <Link to = "Login" style = { styles.registerLink }>
                Login here
              </Link>

        </View >
      )}
      </Formik>
    );
};

const Register= () => (
    <div>
        <RegisterForm  />
    </div>
)



export default Register