import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



  
/**
 * A searchbar-styled component that serves to open the searchBar page.
*/  
const LinkSearchBar = ({ onPress, placeholder, ...props }) => {
  const styles = StyleSheet.create({
    searchbarContainer: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: "rgb(255, 255, 255)",
      borderRadius: 5,
      borderWidth: 0.3,
      borderColor: "rgba(155, 155, 155, 0.3)", 
      marginHorizontal: 5,
  
    },
    searchbarText: {
      fontSize: 18,
      marginLeft: 8,
      color: "rgba(0,0,0,0.7)",
    },
  });
    return (
      <TouchableOpacity
        // style={styles.searchbarContainer}
        onPress={onPress}
        activeOpacity={1}

      >
        <Surface style={[styles.searchbarContainer, props.style]} elevation = {3}>
          <MaterialIcons name="search" size={24} color="#7e7e7e" />
          <Text style={styles.searchbarText}>{placeholder}</Text>
        </Surface>
      </TouchableOpacity>
    );
  };
  
export default LinkSearchBar;