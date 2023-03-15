import React from "react";
import {View, Text} from "react-native";

import CardList from "./CardList";
import  ProgressBar  from "../displays/ProgressBar";


export default function CardDiv() {

    return (

        <View style={styles.container}>
        <ProgressBar style={styles.progressbar}/>
        <CardList/>
        </View>


    );

}


const styles = {
container: {
backgroundColor: "#E9E4E2",
top: 50,

},
progressbar: {
    top: 10,
}
}