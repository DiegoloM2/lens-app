import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";



export default Dropdown = ({items, handleChange}) => {
    const { colors } = useTheme();

    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            color: colors.primary,
            paddingRight: 30, // to ensure the text is never behind the icon,
            margin: 0

        },
        inputAndroid: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            color: colors.primary,
            paddingRight: 30, // to ensure the text is never behind the icon,
            margin: 0
        }
    });

    const styles = StyleSheet.create({
        container: {
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: colors.background,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: '#707070',
          height: 50,
        },
      });
    


    return (
        <View style = {styles.container}>
        <RNPickerSelect
            onValueChange={(value) => handleChange(value)}
            items={items}
            style = {pickerSelectStyles}
        />
        </View>
    );
};