import React from "react";
import { View } from "react-native";


/**
 * A component that contains all the scrollable content of the homepage.
 */
const HomeCard = (props) => {

    return (
        <View>
            { props.children }
        </View>
    )
}

export default HomeCard