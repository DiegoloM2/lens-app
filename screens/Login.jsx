import React, { useContext, useState } from "react";
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
import AuthContext from "../contexts/AuthContext";
import Link from "../components/touchables/Link";
import {  View, StyleSheet} from "react-native";
import { shadowStyle } from "../utils/styles";
import Input from "../components/forms/Input";
import { TextInput, Button, Text, HelperText } from "react-native-paper";

/**
 * This is the object that contains the validation of the login form.
 */
const loginValidation = Yup.object({
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
const handleLoginForm = async (values, auth) => {
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

let styles = StyleSheet.create({
    form: {
      backgroundColor:"white",
      marginVertical: "50px",
      marginHorizontal: "50px",
      flexDirection: "column",
      borderRadius: "0.45em",
      padding: "15px",
      shadowColor: "red",
      shadowOpacity: 1,
      shadowOffset: "10px",
      shadowRadius: "100px",
      fontFamily:"sans-serif",
    },
    formTitle: {
      fontSize: "2em",
      textAlign:"center",
      fontWeight:"bold",
    },
    forgotLink: {
      marginBottom: "20px",
      textAlign:"right",
    },
    registerLink: {
      textAlign: "center",
      marginVertical: "20px",

    }
  });



const LoginForm = () => {
    const auth = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Formik
        initialValues={{password: '', email: '' } }
        validationSchema={loginValidation}
        onSubmit={(values) => {handleLoginForm(values, auth)}}
     >
      { props => (
        <View style = {[styles.form, shadowStyle.boxShadow]}>
          <Text style = {styles.formTitle}>Login</Text>

          <View>
            <Input
              label = "Email" name = "email"
              placeholder = "example@mail.com"
              left = {<TextInput.Icon icon = "email" />}
              value = {props.values.email}
              onChangeText = {props.handleChange("email")}
              keyboardType="email-address" />
              { props.errors.email && <HelperText type = "error">{props.errors.email}</HelperText>}

            <Input secureTextEntry = {!showPassword} 
              label = "Password" 
              name = "password" 
              type = "password" 
              placeholder = "type your password"
              right={<TextInput.Icon icon = "eye" onPress = {(e) => {setShowPassword(!showPassword)}}/>}
              left={<TextInput.Icon icon = "key" onPress = {(e) => {setShowPassword(!showPassword)}}/>}
              value = {props.values.password}
              onChangeText = {props.handleChange("password")}
              />  
              { props.errors.password && <HelperText type = "error">{props.errors.password}</HelperText>}

            </View>
              <Link to = "/" style = { styles.forgotLink }>
                Forgot your password?
              </Link>
        
          <Button mode = "contained" disabled = {!props.isValid} onPress = { (e) => {handleLoginForm(props.values, auth) }}>LOGIN</Button>

              <Link to = "/register" style = { styles.registerLink }>
                Register here
              </Link>

        </View >
      )}
      </Formik>
    );
};

const Login= () => (
    <div>
        <LoginForm  />
    </div>
)



export default Login