import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  searchbarText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#7e7e7e',
  },
});

  
/**
 * A searchbar-styled component that serves to open the searchBar page.
*/  
const LinkSearchBar = ({ onPress, ...props }) => {
  
    return (
      <TouchableOpacity
        style={styles.searchBarContainer}
        onPress={onPress}
        activeOpacity={1}

      >
        <MaterialIcons name="search" size={24} color="#7e7e7e" />
        <Text style={styles.searchbarText}>Search</Text>
      </TouchableOpacity>
    );
  };
  
export default LinkSearchBar;