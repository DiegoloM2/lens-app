import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserDecks } from '../store/storage';
import AuthContext from './AuthContext';

const DecksContext = createContext();

export const DecksProvider = ({ children }) => {
    const auth  = useContext(AuthContext);
    const [decks, setDecks] = useState([]);
    const [loading, setLoading] = useState(true);
    const effect = async () => {
        try {
            setDecks(await getUserDecks(auth.user.username))
        } catch (e) {console.error(e)}
        setLoading(false);
    };

    useEffect(() => {
        effect(decks, loading)
    }, [decks, loading]);


    return (
        <DecksContext.Provider value={{ decks, setDecks }}>
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
