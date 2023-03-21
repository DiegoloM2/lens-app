import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTodayStudiedCards, getUserCardsForToday } from '../store/storage';
import AuthContext from './AuthContext';

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
    const auth = useContext(AuthContext);
    const [cardsStudiedToday, setStudiedToday] = useState(0);
    const [cardsToStudyToday, setToStudyToday] = useState([]);
    const effect = async () => {
        try {
            setStudiedToday(await getTodayStudiedCards(auth.user.username));
            setToStudyToday(await getUserCardsForToday(auth.user.username));
        } catch (e) {console.error(e)}
    };

    useEffect(() => {
        effect(cardsStudiedToday, cardsToStudyToday);
    }, [auth.user.username]);


    return (
        <CardsContext.Provider value={{ cardsStudiedToday, setStudiedToday, cardsToStudyToday, setToStudyToday }}>
        {children}
        </CardsContext.Provider>
    );
};

export const useCards = () => {
    const context = useContext(CardsContext);

    if (!context) {
        throw new Error('useCards must be used within a DecksProvider');
    }

    return context;
};
