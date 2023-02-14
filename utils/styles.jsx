import React from "react";
import { Platform } from "react-native";

export const shadowStyle =  (Platform.OS === 'ios') ? 
     {
      shadowColor: "red",
      shadowOffset: {width: "0px", height: "0px"},
      shadowOpacity: 0.5,
      shadowRadius: "100px",
    } : {
      elevation: 20,
      shadowColor: "red",
    }