import React from "react";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import ProgressBar from "./ProgressBar";

const LeftContent = props => <Avatar.Icon {...props} color="white" icon="cards-outline" />


const ProgressBarCard = () => (
    <Card>
      <Card.Title title="Decks Progress" subtitle="Let's work" left={LeftContent} />
      <Card.Content>
        <Text> </Text>{/*Espacio entre titulo y ProgressBar*/}
        <ProgressBar />
  
      </Card.Content>
    
      <Card.Actions>
        <Button color="blue">Pussy</Button>
        <Button color="blue">Keep going</Button>
      </Card.Actions>
    </Card>
  );
export default ProgressBarCard;