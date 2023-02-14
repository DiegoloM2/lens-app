import React, { useContext } from "react"
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from "../contexts/AuthContext";


const Home = () => {
    const auth = useContext(AuthContext);
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>Welcome home {auth.user}</Text>
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