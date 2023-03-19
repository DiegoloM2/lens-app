import React, { createContext, useEffect, useState, useSyncExternalStore } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext({});

export default AuthContext;


/**
 * @param { string } token - the user's email 
 */
const setStorageToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token)
  } catch (e) {
    console.log(e);
  }
}
const setStorageUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', user);
  } catch (e) {
    console.log(e);
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
    const [authToken, setAuthToken] = useState(null);

    const [user, setUser] = useState(() => null);

  const [loading, setLoading] = useState(true);

  const logoutUser = async () => {
    try {
      setAuthToken(null);
      setUser(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");  
    } catch (e) {
      console.log(e);
    }

  };

  const registerUser = async (email, username, password) => {
    try {
      setAuthToken(email);
      setUser(username);
      await setStorageToken(email);
      await setStorageUser(user)
      await AsyncStorage.setItem("password", password)
      var users = await AsyncStorage.getItem('users');
      users = users != null ? JSON.parse(users): [];
      users.push({token: email, password: password})
      await AsyncStorage.setItem("users", JSON.stringify(users))
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * A function that logs in a user and returns whether the user exists or not.
   * @param { string } email 
   * @param { string } password 
   * @returns 
   */
  const loginUser = async (email, password) => {
    var userExists = false;
    var users = await AsyncStorage.getItem('users');
    users = JSON.parse(users);
    users.filter((user) => {if (user.password == password && user.token.toLowerCase() == email.toLowerCase()) userExists = true;})
  if (userExists) {
      setAuthToken(email);
      await setStorageToken("token", email)
      await setStorageUser('user', email)
      setUser(email)
      return true;
    } else {
      return false;
    }
  }

  const effect = async () => {
    try {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      let user = await AsyncStorage.getItem("user")
      setUser(user);
    }
  } catch (e) {console.log(e)}
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