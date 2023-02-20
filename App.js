import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
            <BottomNav/>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>

  );
}

