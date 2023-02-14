import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./components/layout/Main";
import { AuthProvider } from './contexts/AuthContext';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BottomNav from "./components/layout/BottomNav";


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
          <Stack.Navigator initialRouteName = "Main" >
            <Stack.Screen name = "Main" component = {Main} options={{headerShown: false}} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>

  );
}

