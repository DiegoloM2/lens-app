import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";


const style = StyleSheet.create({
    input: {
        borderBottomWidth: "1px",
        borderBottomColor: "lightgrey",
        marginTop: "10px",
        paddingBottom: "5px"
      }
})

const Input = (props) => {
    return (
    <TextInput 
    style = {style.input} 
    placeholderTextColor = "rgba(150,150,150,0.9)" mode = "outlined" {...props}/>)
}

export default Input;