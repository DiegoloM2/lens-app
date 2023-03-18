import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from "./ProgressBar";
import Swiper from 'react-native-swiper';
import DeckCard from './DeckCard';

const styles = StyleSheet.create({
  slide: {
    padding: 5,
  }
});



const DeckPreviewCarousel = ({ decks }) => {
  return (
    <Swiper style={styles.wrapper} height = {400} activeDotColor="#007AFF" >
      {decks.map((deck, index) => (

        <View key={index} style = {styles.slide}>
          <DeckCard key = {index} deck = {deck} />  
        </View>
      ))}
    </Swiper>
  );
};

  
export default DeckPreviewCarousel;