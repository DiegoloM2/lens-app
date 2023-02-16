import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register"
import BottomNav from "./components/layout/BottomNav";
import { AuthProvider } from './contexts/AuthContext';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
    link: "navy"
  },
};



export default function App() {
  return (
    <PaperProvider theme = { theme }>
      <NavigationContainer >
        <AuthProvider>
          {/* <Stack.Navigator initialRouteName = "Login" >
            <Stack.Screen name = "Home" component = {Home} options = {{headerShown:false}} />
            <Stack.Screen name = "Login" component = {Login} />
            <Stack.Screen name = "Register" component = {Register} options={{headerShown: false}} /> */}
            <BottomNav/>

          {/* </Stack.Navigator> */}
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>

  );
}

