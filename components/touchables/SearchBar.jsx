import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar} from 'react-native-paper';

const styles = StyleSheet.create({
  SearchBar: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 30,
    marginVertical: 15,
    borderWidth: 0.3,
    borderColor: "rgba(155, 155, 155, 0.3)", 
    marginHorizontal: 5,
  }
})

const SearchBar = ({placeholder, icon}) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={icon}
        showloading={true}
        testID='searchbar'
        style = {styles.SearchBar}
      />
    );
  };
  
  export default SearchBar;
