import React from "react";
import { View, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    Container: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10
    }
})

/**
 * A component that contains all the scrollable content of the homepage.
 */
const HomeCard = (props) => {

    return (
        <View style = {styles.Container}>
            { props.children }
        </View>
    )
}

export default HomeCard