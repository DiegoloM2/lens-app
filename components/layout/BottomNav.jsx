import React, {useState} from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "../../screens/Home";
import Study from "../../screens/Study";
import Deck from "../../screens/Deck";
import CreateDeck from "../../screens/CreateDeck"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeckSearch from "../../screens/Search";

const Stack = createNativeStackNavigator();
const DeckNavigator = () => (
  <Stack.Navigator initialRouteName="Deck">
    <Stack.Screen name="Deck" component={Deck} options = {{headerShown:false}}/>
    <Stack.Screen name="Create Deck" component={CreateDeck} options = {{headerShown:false}}/>
    <Stack.Screen name = "Search" component = {DeckSearch} options = {{headerShown:false}} />
  </Stack.Navigator>
)

const BottomNav = () => {
  const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator
          initialRouteName = "Home"
          compact = {true}

        >
          <Tab.Screen
            name = "Decks"
            compact = {true}
            component = {DeckNavigator}
            options = {{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="folder-multiple" color={color} size={26} />
              ),
          }}/>

          <Tab.Screen
            name = "Home"
            component = {Home}
            options = {{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}/>
          <Tab.Screen
            name = "Study"
            compact = {true}
            component = {Study}
            options = {{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book-open-variant" color={color} size={26} />
              ),
            }}
            />  
        </Tab.Navigator>
    );
    
}


export default BottomNav;