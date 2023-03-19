import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUser, loadUser, loadUsers, saveDeck, saveCard } from "../store/storage.js";

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
    } catch (e) {
      console.log(e);
    }

  };

  const registerUser = async (email, username, password) => {
    try {
      const user = { email: email, username: username, password: password, token: email}
      setAuthToken(email);
      await saveUser(user)
      setUser(user);
      await setStorageToken(email);

      let deck = {
        title: "Welcome", 
        description: "Welcome to LENS, this is your first Deck!",
        id: Math.floor((Math.random() * 300) + 1),
        owner: user.username
      }
      let card = {
        id: Math.floor((Math.random() * 300) + 1),
        question: "What is LENS?",
        answer: `
          LENS is what will get you going in your studies! With our algorithm,
          you will be told when to study the flashcards you create so that you
          can maximize retention in a minimum amount of time (5 minutes per day)!`,
        deck: deck.id
      }

      await saveDeck(deck);
      await saveCard(card);
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
    var users = await loadUsers();
    const user = users.filter((user) => {if (user.password == password && user.email.toLowerCase() == email.toLowerCase()) userExists = true;})
  if (userExists) {
      setAuthToken(email);
      await setStorageToken(email)
      setUser(user);
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
      let user = await loadUser(token);
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