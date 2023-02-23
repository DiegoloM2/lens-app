import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="Search your decks here"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon="search"
        loading={true}
        testID='searchbar'
      />
    );
  };
  
  export default SearchBar;