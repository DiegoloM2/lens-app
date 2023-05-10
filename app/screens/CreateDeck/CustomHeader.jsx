import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeader = ({ navigation, title }) => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={25} color="rgba(0,0,255,0.8)" />
        </TouchableOpacity>
        <View style = {styles.titleContainer}>
            <MaterialCommunityIcons name="cards-outline" size={20} color="rgba(0,0,0,0.8)" />
            <Text style={styles.headerTitle}>{title}</Text>
        </View>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 16,
      backgroundColor: 'white',
    },
    titleContainer: {flex: 1, flexDirection: "row", justifyContent: "center"},
    headerTitle: {
        marginLeft: 5, 
      fontSize: 18,
      fontWeight: 'bold',
      color: 'rgba(0,0,0,0.8)',
    },
  });
export default CustomHeader; 