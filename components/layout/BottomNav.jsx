import React, {useState} from "react";
import Link  from "../touchables/Link"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from "../../screens/Home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const BottomNav = () => {
  const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator
          initialRouteName = "Home"
          compact = {true}

        >
          <Tab.Screen
            name = "Home"
            component = {Home}
            options = {{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}/>
          <Tab.Screen
            name = "CreateCard"
            compact = {true}
            component = {Home}
            options = {{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="create-card" color={color} size={26} />
              ),
            }}/>
          <Tab.Screen
            name = "Whatev"
            compact = {true}
            component = {Home}
            options = {{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
            />

          {/* <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
              }}
            /> */}
        </Tab.Navigator>
    );
    
}


export default BottomNav;