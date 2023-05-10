import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Puedes utilizar otros conjuntos de íconos si lo prefieres

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10
    },
    icon: {
      marginRight: 10,
    },
    textContainer: {
      flexDirection: 'column',
    },
    label: {
      fontSize: 12,
      color: "rgba(0,0,0,0.7)",

    },
    value: {
      fontSize: 14,
      color: "rgba(0,0,0,0.7)",
      fontWeight: 'bold',
    },
  });
  
const IconTextContainer = ({ icon, label, value, iconStyle }) => {
    return (
      <View style={styles.container}>
        <Icon name={icon} size={30} style={[styles.icon, iconStyle]} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    );
  };
  
export default IconTextContainer;