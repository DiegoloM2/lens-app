import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserDecks, saveDeck, updateDeck } from '../store/storage';
import AuthContext from './AuthContext';

const DecksContext = createContext();

export const DecksProvider = ({ children }) => {
    const auth = useContext(AuthContext);
    const [decks, setDecks] = useState([]);

    // function to update decks once one has been added/deleted. 
    const handleAddDeck = async (deck) => {
        await saveDeck(deck);
        setDecks([...decks, deck])
    };
    const handleUpdateDeck = async (deck) => {
        await updateDeck(deck);
        const newDecks = decks.filter(compDeck =>  compDeck.id !== deck.id)
        setDecks([...newDecks, deck])
    }
  
    const effect = async () => {
      try {
        setDecks(await getUserDecks(auth.user.username));
      } catch (e) {
        console.error(e);
      }
    };
  
    useEffect(() => {
      effect();
    }, [auth.user.username]);
  
    return (
      <DecksContext.Provider value={{ decks, setDecks, handleAddDeck, handleUpdateDeck }}>
        {children}
      </DecksContext.Provider>
    );
  };
  
    export const useDecks = () => {
    const context = useContext(DecksContext);

    if (!context) {
        throw new Error('useDecks must be used within a DecksProvider');
    }

    return context;
    };
