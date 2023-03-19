import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, StyleSheet } from "react-native";
import { Subheading, Text, useTheme } from "react-native-paper";



export default Dropdown = ({items, handleChange, placeholder, label, value}) => {
    const { colors } = useTheme();
    const [opened, setOpened] = useState(false);
    const [valueState, setValue] = useState(value)

    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            paddingRight: 30, // to ensure the text is never behind the icon,
            margin: 0,
            colors: "black",
        },
        inputAndroid: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            colors: "black",
            paddingRight: 30, // to ensure the text is never behind the icon,
            margin: 0,
        }
    });

    const styles = StyleSheet.create({
        mainContainer: {
            marginTop: 15,
            color: colors.primaryContainer
        },
        label: {
            color: colors.onPrimaryContainer,
            marginBottom: 3
        },
        container: {
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: colors.background,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#707070',
          height: 50,

        },
        opened: {
            borderColor: colors.primary,
            borderWidth: 2
        }
      });


    return (
        <View style = {styles.mainContainer}>
            <Text style = {styles.label}>{label}</Text>
            <View style = {opened ? {...styles.container, ...styles.opened}: styles.container}>
            <RNPickerSelect
                value = {valueState}
                placeholder = {{label: placeholder, value: null}}
                onValueChange={(value) => setValue(value)}
                items={items}
                style = {pickerSelectStyles}
                onOpen = {() => setOpened(true)}
                onClose = {() => setOpened(false)}
            />
            </View>
        </View>
    );
};