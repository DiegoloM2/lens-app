import React from "react";
import { Platform } from "react-native";

export const shadowStyle =  (Platform.OS === 'ios') ? 
     {
      shadowColor: "rgba(230,230,230)",
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.5,
      shadowRadius: 10
    } : {
      elevation: 20,
      shadowColor: "black",
    }