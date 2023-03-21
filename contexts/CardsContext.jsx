import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTodayStudiedCards, getUserCardsForToday, saveCard } from '../store/storage';
import AuthContext from './AuthContext';

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
    const auth = useContext(AuthContext);
    const [cardsStudiedToday, setStudiedToday] = useState(0);
    const [cardsToStudyToday, setToStudyToday] = useState([]);
    const [cardsModified, setCardsModified] = useState(false);
    
    const handleAddCard = async (card) => {
        await saveCard(card);
        setToStudyToday([...cardsToStudyToday, card]);
        setCardsModified(!cardsModified)
    }
    const handleUpdateCard = async (card) => {
        await saveCard(card);
        setToStudyToday([...cardsToStudyToday]);
        setCardsModified(!cardsModified)
    }
    const handleDeleteCard = async (card) => {
        await deleteCard(card);
        setToStudyToday(cardsToStudyToday.filter(comp => comp.id != card.id))
        setCardsModified(!cardsModified)
    }

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
        <CardsContext.Provider value={
            { cardsStudiedToday, setStudiedToday, cardsToStudyToday,
             setToStudyToday, handleAddCard, handleDeleteCard,
              handleUpdateCard, cardsModified }
        }>
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
