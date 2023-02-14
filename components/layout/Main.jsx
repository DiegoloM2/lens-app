import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import Home from "../../screens/Home";
import Login from "../../screens/Login";
import BottomNav from "./BottomNav";
import { View } from "react-native";

const Main = () => {
    const auth = useContext(AuthContext);
    if (auth.user) {
        return (
            <View>
                <Home />
                <BottomNav/>
            </View>)
    } else {
        return (
            <View>
                <Login />
            </View>
        )

    }
}


export default Main;