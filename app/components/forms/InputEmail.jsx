import React, { useState } from "react"
import Input from "./Input"
import { TextInput } from "react-native-paper";

/**
 * @param { value } value of the input, decided by parent form.
 * @param { onChangeText } function triggered when email input changes.  
 * @param { errors } array of errors related to the input.
 * @returns An functioning email input with updating value, and errors.
 */
const InputEmail = (props) => {
    return (
        <Input 
            label = "Email" 
            name = "email"  
            placeholder = "example@mail.com"
            left={<TextInput.Icon icon = "email" />}
            value = {props.value}
            onChangeText = {props.onChangeText}
            errors = {props.errors}
        />
    )
}

export default InputEmail;
