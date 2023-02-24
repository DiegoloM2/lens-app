import * as React from 'react';
import { Searchbar} from 'react-native-paper';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="Search your decks here"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon="search"
        showloading={true}
        testID='searchbar'
      />
    );
  };
  
  export default SearchBar;
