import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from "./ProgressBar";
import Swiper from 'react-native-swiper';
import DeckCard from './DeckCard';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    padding: 10,
  },
  // Nuevo contenedor para el ProgressBar y las estadísticas
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1, // Asigna el espacio restante en la fila al ProgressBar
    height: 8,
    borderRadius: 4,
    marginRight: 20,
  },
});



const DeckPreviewCarousel = ({ decks }) => {
  return (
    <Swiper style={styles.wrapper} height = {200} activeDotColor="#007AFF" >
      {decks.map((deck, index) => (

        <View key={index} style = {styles.slide}>
          <DeckCard key = {index} deck = {deck} />  
        </View>
      ))}
    </Swiper>
  );
};

  
export default DeckPreviewCarousel;