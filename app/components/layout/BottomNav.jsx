import React, {useState} from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "../../screens/Home";
import Study from "../../screens/Study";
import Deck from "../../screens/Deck";
import CreateDeck from "../../screens/CreateDeck/CreateDeck"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeckSearch from "../../screens/Search";
import CreateDeckHeader from "../../screens/CreateDeck/CustomHeader";


import DeckEditing from "../../screens/DeckEditing";
import CreateCard from "../../screens/CreateCard";

const Stack = createNativeStackNavigator();
const DeckNavigator = () => (
  <Stack.Navigator initialRouteName="Deck">
    <Stack.Screen name="Deck" component={Deck} options = {{headerShown:false}}/>
    <Stack.Screen name="Create Deck" component={CreateDeck} options ={{header: (props) => <CreateDeckHeader {...props} title="Create a Deck" />}} />
    <Stack.Screen name = "Search" component = {DeckSearch} options = {{title: "Search decks"}}/>
    <Stack.Screen name = "DeckEdit" component = {DeckEditing} 
      options = { ({ route }) => ({title: `${route.params.deck.title}`}) }
      initialParams = {{deck: null}}
    />
    <Stack.Screen 
      name = "CreateCard" 
      component = {CreateCard} options ={{title:"Create a Card!"}}
      initialParams = {{deck:null}}
      />


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