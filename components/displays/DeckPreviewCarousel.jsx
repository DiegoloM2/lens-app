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
      {decks.slice(0, 5).map((deck, index) => (

        <View style = {styles.slide} key = {index} >
          <DeckCard deck = {deck} />  
        </View>
      ))}
    </Swiper>
  );
};

  
export default DeckPreviewCarousel;