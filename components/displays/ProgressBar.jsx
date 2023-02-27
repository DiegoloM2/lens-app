import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const LeftContent = props => <Avatar.Icon {...props} color="white" icon="cards-outline" />

const ProgressBarCard = () => (
  <Card>
    <Card.Title title="Decks Progress" subtitle="Let's work" left={LeftContent} />
    <Card.Content>
      <Text> </Text>{/*Espacio entre titulo y ProgressBar*/}
      <AnimatedCircularProgress
        size={100}
        width={20}
        fill={28}
        tintColor="blue"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#E0F8F1" 
        rotation="0"
        lineCap="round"
        backgroundWidth="30"/>
    </Card.Content>
  
    <Card.Actions>
      <Button color="blue">Pussy</Button>
      <Button color="blue">Keep going</Button>
    </Card.Actions>
  </Card>
);

export default ProgressBarCard;

{/*<AnimatedCircularProgress
  size={200}
  width={3}
  fill={this.state.fill}
  tintColor="#00e0ff"
  backgroundColor="#3d5875">
  {
    (fill) => (
      <Text>
        { this.state.fill }
      </Text>
    )
  }
</AnimatedCircularProgress> 
https://www.npmjs.com/package/react-native-circular-progress*/}