import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from 'react-native';
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
      fontSize: 14,
      fontWeight: 'bold',
      color: "rgba(0,0,0,0.7)"

    },
    itemDescription: {
      fontSize: 12,
      color: "rgba(0,0,0,0.7)"

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
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  
    return (
      <SafeAreaView>
        <Searchbar
          ref={searchbarRef} // Add the ref to the Searchbar component        
          placeholder="Search your decks"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {filteredDecks.length > 0 ?         
        <FlatList
          data={filteredDecks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />: <Text style = {{textAlign: "center", marginTop: 20}}>No matches found in your decks</Text> }

      </SafeAreaView>
    );
  };
  
export default DeckSearch;