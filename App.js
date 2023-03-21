import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from "./components/layout/BottomNav";
import AuthContext, { AuthProvider } from './contexts/AuthContext';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Register from "./screens/Register";
import Login from "./screens/Login";
import { DecksProvider } from "./contexts/DeckContext";
import { CardsProvider } from "./contexts/CardsContext";



const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();


const StackNavigator = () => (
  <DecksProvider>
    <CardsProvider>
      <Stack.Navigator>
        <Stack.Screen name="BottomNav" component={BottomNav} options = {{headerShown: false}} />
      </Stack.Navigator>
    </CardsProvider>
  </DecksProvider>  

)

const AuthStackNavigator = () => (
  
  <AuthStack.Navigator>
    <Stack.Screen name = "Login" component = {Login} options = {{headerShown:false}} />
    <Stack.Screen name="Register" component={Register} options = {{headerShown: false}} />
  </AuthStack.Navigator>
)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
    link: "navy"
  },
};


const RootNavigator = () => {
  const auth = useContext(AuthContext);
  return auth.user === null ? <AuthStackNavigator />: <StackNavigator />
}


const App = () => {

  return (
    <PaperProvider theme = {theme}>
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
