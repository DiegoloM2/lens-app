import * as React from 'react';
import { Avatar, Button, Card, Text,Searchbar} from 'react-native-paper';
import { StyleSheet } from 'react-native-web';

const MyComponent = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
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
  
  export default MyComponent;
