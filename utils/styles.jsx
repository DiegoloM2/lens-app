import React from "react";
import { Platform } from "react-native";

export const shadowStyle =  (Platform.OS === 'ios') ? 
     {
      shadowColor: "red",
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.5,
      shadowRadius: 100,
    } : {
      elevation: 20,
      shadowColor: "red",
    }