import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar} from 'react-native-paper';

const styles = StyleSheet.create({
  SearchBar: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 30,
    marginTop: 15,
    borderWidth: 0.3,
    borderColor: "rgba(155, 155, 155, 0.3)", 
    marginHorizontal: 5,
  }
})

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="Search your decks here"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon="cloud-search-outline"
        showloading={true}
        testID='searchbar'
        style = {styles.SearchBar}
      />
    );
  };
  
  export default SearchBar;
