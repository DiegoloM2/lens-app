import React from "react";
import {View} from "react-native";
import SearchBar from "../components/touchables/SearchBar";
import DeckInfoEditing from "../components/forms/DeckInfoEditing";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeckEditing() {

return(
    <SafeAreaView>
        <SearchBar/>
        <DeckInfoEditing/>
    </SafeAreaView>    
  
);

};