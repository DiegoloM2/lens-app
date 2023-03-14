import React from "react";
import { Platform } from "react-native";

export const shadowStyle =  (Platform.OS === 'ios') ? 
     {
      shadowColor: "rgba(250,250,250)",
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.3,
      shadowRadius: 10
    } : {
      elevation: 20,
      shadowColor: "black",
    }