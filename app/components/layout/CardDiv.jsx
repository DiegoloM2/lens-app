import React from "react";
import { View, Text } from "react-native";

import CardList from "./CardList";
import ProgressBar from "../displays/ProgressBar";
import LinkSearchBar from "../touchables/LinkSearchBar";
export default function CardDiv() {
  return (
    <View style={styles.container}>
      <LinkSearchBar placeholder = "Search your cards here" />
      <Text style={styles.text}>Cards</Text>
      <CardList />
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "#E9E4E2",
    top: 50,
    borderRadius: 30,
    padding: 10,
    /*width: 330, */
  },
  progressbar: {   
    top: 15,
    left: 210,
  },

  text: {
    top: 15,
    left: 10,
    fontSize: 18,
    color: "grey",
  },
};
