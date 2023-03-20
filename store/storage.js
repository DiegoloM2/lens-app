import AsyncStorage from '@react-native-async-storage/async-storage';


// User: username (string), email (string:email), password (string), token (string)
export const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem(`user:${user.token}`, JSON.stringify(user));
    } catch (error) {
        console.error("Error saving user:", error);
    }
}

export const loadUser = async (token) => {
    try {
        const user = await AsyncStorage.getItem(`user:${token}`);
        return JSON.parse(user);
    } catch (error) {
        console.error("Error saving user", error);
    }
}

export const loadUsers = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const userKeys = keys.filter((key) => key.startsWith('user:'));
        const userArray = await AsyncStorage.multiGet(userKeys);
        return userArray.map(([_, value]) => JSON.parse(value));
    } catch (error) {
        console.log("Error getting all users:", error)
    }
}

// Deck: title (string), description (string), owner (FK:user(username)), id (PrimaryKey),
//      studiedToday (int: ), lastStudied: ()
// Save a deck
export const saveDeck = async (deck) => {
  try {
    await AsyncStorage.setItem(`deck:${deck.id}`, JSON.stringify(deck));
  } catch (error) {
    console.error('Error saving deck:', error);
  }
};

// Load a deck by its ID
export const loadDeck = async (id) => {
  try {
    const deck = await AsyncStorage.getItem(`deck:${id}`);
    return JSON.parse(deck);
  } catch (error) {
    console.error('Error loading deck:', error);
  }
};

// Load all decks
export const loadDecks = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const deckKeys = keys.filter((key) => key.startsWith('deck:'));
    const deckArray = await AsyncStorage.multiGet(deckKeys);
    return deckArray.map(([_, value]) => JSON.parse(value));
  } catch (error) {
    console.error('Error loading decks:', error);
  }
};

// Update a deck
export const updateDeck = async (updatedDeck) => {
  try {
    await saveDeck(updatedDeck);
  } catch (error) {
    console.error('Error updating deck:', error);
  }
};

// Delete a deck by its ID
export const deleteDeck = async (id) => {
  try {
    await AsyncStorage.removeItem(`deck:${id}`);
  } catch (error) {
    console.error('Error deleting deck:', error);
  }
};

// Get a user's decks
export const getUserDecks = async (username) => {
    try {
        const queryDecks = await loadDecks();
        const final = queryDecks.filter((deck) => (deck.owner == username))
        return final;
        
    } catch (error) {
        console.error("Error getting user decks")
    }
}

// Card: Question (string), Answer (string), next_review (date), deck (ForeignKey:deck(id))

// Save a card
export const saveCard = async (card) => {
  try {
    await AsyncStorage.setItem(`card:${card.id}`, JSON.stringify(card));
  } catch (error) {
    console.error('Error saving card:', error);
  }
};

// Load a card by its ID
export const loadCard = async (id) => {
  try {
    const card = await AsyncStorage.getItem(`card:${id}`);
    return JSON.parse(card);
  } catch (error) {
    console.error('Error loading card:', error);
  }
};

// Load all cards
export const loadCards = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cardKeys = keys.filter((key) => key.startsWith('card:'));
    const cardArray = await AsyncStorage.multiGet(cardKeys);
    return cardArray.map(([_, value]) => JSON.parse(value));
  } catch (error) {
    console.error('Error loading cards:', error);
  }
};

// Update a card
export const updateCard = async (updatedCard) => {
  try {
    await saveCard(updatedCard);
  } catch (error) {
    console.error('Error updating card:', error);
  }
};

// Delete a card by its ID
export const deleteCard = async (id) => {
  try {
    await AsyncStorage.removeItem(`card:${id}`);
  } catch (error) {
    console.error('Error deleting card:', error);
  }
};

export const getDeckCards = async (deck) => {
    try {
        const queryCards = await loadCards();
        return queryCards.filter((card) => card.deck == deck.id);
    } catch (error) {
        console.error(`Error getting ${deck.title}'s cards:`, error);
    }
}


// Get the cards to be studied today for a user. 
// for now it gets all cards since spaced repetition algo is not implemented in frontend.
export const getUserCardsForToday = async (username) => {
    try { 
        const deckQuery = await getUserDecks(username);
        const cardQuery = await loadCards();
        return cardQuery.filter((card) => {
            for (deck in deckQuery) {
                if (deck.id === cardQuery.deck) {
                    return card;
                }
            }
        })
    } catch (error) {
        console.error("Error getting today's cards:", error)
    }
}


// Get num of studied cards for a user
export const getTodayStudiedCards = async (username) => {
    try {
        const deckQuery = await getUserDecks(username);
        console.log("deckQuery", deckQuery)
        var result = 0;
        deckQuery.forEach((deck) => result += deck.studiedToday)
        return result;
    } catch (error) {
        console.error("Error getting cards studied today:", error);
    }
}

// This function clears the AsyncStorage 
// (all users, decks, cards, it is only to be used in development.)
export const clearStorage = async () => {
  await AsyncStorage.clear();
}