import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DeckTitle({ deck }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {deck.name} </Text>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="add-circle" color="#474544" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="create" color="#474544" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    borderBottomColor: "#000000",
    borderBottomWidth: 4,
    padding: 15,
    alingItems: "center",
  },
  text: {
    alingSelf: "center",
    fontSize: 25,
    color: "#000000",
    //fontFamily: "sans-sherif",
    flex: 1,
  },
};
