import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";



const Link = (props) => {
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = StyleSheet.create({
        link: {
            color: theme.colors.link
        }
    })
    return (
        <Text
        onPress = {(e) => {navigation.push(props.to)}} 
        style = {[styles.link, props.style]}>
            {props.children}
        </Text>)
};

export default Link;