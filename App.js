import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from "./components/layout/BottomNav";
import { AuthProvider } from './contexts/AuthContext';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Register from "./screens/Register";
import Study from "./screens/Study";
import Home from "./screens/Home";



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
          <Stack.Navigator>
            <Stack.Screen name="BottomNav" component={BottomNav} options = {{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} options = {{headerShown: false}} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
