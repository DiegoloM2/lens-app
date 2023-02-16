import React, { useState } from "react"
import Input from "./Input"
import { TextInput } from "react-native-paper";

const InputPassword = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Input secureTextEntry = {showPassword} 
            label = "Password" 
            name = "password" 
            type = "password" 
            placeholder = "type your password"
            right={<TextInput.Icon icon = "eye" onPress = {(e) => {setShowPassword(!showPassword)}}/>}
            left={<TextInput.Icon icon = "key" onPress = {(e) => {setShowPassword(!showPassword)}}/>}
            value = {props.value}
            onChangeText = {props.onChangeText}
        />
    )
}

export default InputPassword;
