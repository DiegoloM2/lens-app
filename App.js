import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from "./components/layout/BottomNav";
import { AuthProvider } from './contexts/AuthContext';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Register from "./screens/Register";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();


const StackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name="BottomNav" component={BottomNav} options = {{headerShown: false}} />
    </Stack.Navigator>
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

// export default function App() {
//   return (
//     <PaperProvider theme = { theme }>
//       <NavigationContainer >
//         <AuthProvider>
//         </AuthProvider>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate checking the user's authentication status on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log(token)
      const isAuthenticated = token !== null; // Replace with your authentication logic
      setIsLoggedIn(isAuthenticated);
    };

    checkAuthStatus();
  }, []);

  return (
    <PaperProvider theme = {theme}>
    <NavigationContainer>
      <AuthProvider>
        {isLoggedIn ? <StackNavigator /> : <AuthStackNavigator />}
      </AuthProvider>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
