import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => null);

    const [user, setUser] = useState(() => null);

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const logoutUser = async () => {
    setAuthToken(null);
    setUser(null);
    await AsyncStorage.removeItem("authToken");
    navigation.navigate("Home");
  };

  const registerUser = async (email, username, password) => {
    setAuthToken(username);
    setUser(username);
    await AsyncStorage.setItem("authToken", username);
    await AsyncStorage.setItem("user", username)
  }

  const loginUser = async (email, password) => {
    setAuthToken(email);
    setUser(email);
    await AsyncStorage.setItem("authToken", email)
    await AsyncStorage.setItem("user", email)
  }

  const effect = async () => {
    if (authToken) {
      let user = await AsyncStorage.getItem("user")
      setUser(user);
    }
    setLoading(false);
  };

  useEffect(() => {
    effect(authToken, loading)
  }, [authToken, loading]);

  const contextData = {
    user,
    setUser,
    authToken,
    setAuthToken,
    registerUser,
    loginUser,
    logoutUser
  };


  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children }
    </AuthContext.Provider>
  );


}