import React, { useContext } from "react"
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from "../contexts/AuthContext";
import HomeCard from "../components/layout/HomeCard";
import NavBar from "../components/layout/NavBar";

const TestDecks = [
    {
        "name": "Physics",
        "studiedCards": 15,
        "remainingCards": 10,
        "description": "Deck to study physics"
    },
    {
        "name": "Maths",
        "studiedCards": 1,
        "remainingCards": 8,
        "description": "Deck to study mathematics"
    },
    {
        "name": "Literature",
        "studiedCards": 13,
        "remainingCards": 20,
        "description": "Deck to study English Literature"
    }    
    
]

const Home = () => {
    const auth = useContext(AuthContext);
    return (
        <View>
            <NavBar />
            <HomeCard>
            </HomeCard>
        </View>
        )
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
text: {
    color: "red",
    fontWeignt: "bold",
}
});
  

export default Home;