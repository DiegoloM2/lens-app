import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";


const style = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        marginVertical: 9,
        paddingBottom: 5
      }
})

const Input = (props) => {
    return (
        <View>
            <TextInput 
            style = {style.input} 
            placeholderTextColor = "rgba(150,150,150,0.9)" mode = "outlined" {...props}/>
            { props.errors && <HelperText type = "error">{props.errors}</HelperText>}
        </View>
    )

}

export default Input;