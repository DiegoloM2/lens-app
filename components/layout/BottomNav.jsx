import React, {useState} from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "../../screens/Home";
import Login from "../../screens/Login";


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
            component = {Login}
            options = {{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="card-plus" color={color} size={26} />
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