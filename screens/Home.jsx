import React, { useContext } from "react"
import { StyleSheet, Text, View } from 'react-native';
import AuthContext from "../contexts/AuthContext";
import HomeCard from "../components/layout/HomeCard";


const Home = () => {
    const auth = useContext(AuthContext);
    return (
        <HomeCard>
            {/* <View style = {styles.container}> */}
                <Text style = {styles.text}>Welcome home {auth.user}</Text>
            {/* </View> */}
        </HomeCard>
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