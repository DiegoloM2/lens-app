import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


const AuthContext = createContext({});

export default AuthContext;


/**
 * @param { string } token - the user's email 
 */
const setStorageToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token)
  } catch (e) {
    console.err(e);
  }
}
const setStorageUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', user);
  } catch (e) {
    console.err(e);
  }
}

/**
 * Provides the overall application with the user object and 
 * functionality such as login, logout, register, etc.
 * Furthermore, stores the 'email' as the token for the user in asyncStorage,
 * as well as the password in order to check existence of a user when
 * re-logging.
 * @param {*} param0 
 * @returns 
 */
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => null);

    const [user, setUser] = useState(() => null);

  const [loading, setLoading] = useState(true);

  const logoutUser = async () => {
    setAuthToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

  };

  const registerUser = async (email, username, password) => {
    try {
      setAuthToken(email);
      setUser(username);
      await setStorageToken(email);
      await setStorageUser(user)
      await AsyncStorage.setItem("password", password)
    } catch (e) {
      console.err(e);
    }
  }

  /**
   * A function that logs in a user and returns whether the user exists or not.
   * @param { string } email 
   * @param { string } password 
   * @returns 
   */
  const loginUser = async (email, password) => {
    const actualPassword = await AsyncStorage.getItem("password");
    if (password = actualPassword) {
      setAuthToken(email);
      await AsyncStorage.setItem("token", email)
      return true;
    } else {
      return false;
    }
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