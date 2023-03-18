import React, { useContext } from "react"
import { View } from 'react-native';
import AuthContext from "../contexts/AuthContext";
import NavBar from "../components/layout/NavBar";
import ProgressBarCard from "../components/displays/ProgressBarCard";



const Home = () => {
    const auth = useContext(AuthContext);
    return (
        <View>
            <NavBar />
            <ProgressBarCard />

        </View>
        )
  }

export default Home;