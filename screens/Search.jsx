import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { TestDecks } from '../utils/testData';

const styles = StyleSheet.create({
    searchBar: {
      margin: 10,
    },
    itemContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    itemDescription: {
      fontSize: 14,
    },
  });
  

const DeckSearch = ({ route }) => {
    const { availableDecks } = route.params;

    const searchbarRef = useRef(null); // Create a ref for the Searchbar component

    useEffect(() => {
      if (searchbarRef.current) {
        searchbarRef.current.focus(); // Focus the Searchbar when the component mounts
      }
    }, []);
  
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDecks, setFilteredDecks] = useState(availableDecks);
  
    const onChangeSearch = (query) => {
      setSearchQuery(query);
      setFilteredDecks(
        availableDecks.filter((deck) =>
          (deck.title && deck.title.toLowerCase().includes(query.toLowerCase())) ||
          (deck.description && deck.description.toLowerCase().includes(query.toLowerCase()))
        )
      );
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    );
  
    return (
      <View>
        <Searchbar
            ref={searchbarRef} // Add the ref to the Searchbar component        
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <FlatList
          data={filteredDecks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
  
export default DeckSearch;