import React from "react";
import { FlatList } from "react-native";
import { View } from "react-native-web";
import CardPreview from "./CardPreview";

const DATA = [
  {
    id: "0",
    cardname: "When was america discovered ?",
  },

  {
    id: "1",
    cardname: "Who invented the radio ?",
  },

  {
    id: "2",
    cardname: "What is a quaternion ?",
  },
];

export default function CardList() {
  return (
   
      <FlatList
        style={styles.flatlist}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardPreview title={item.cardname} />}
      />
   
  );
}

const styles = {
  flatlist: {
    marginTop: 15,
  },
};
