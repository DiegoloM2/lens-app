import * as React from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Avatar, Button, Card, Text} from 'react-native-paper';
import { StyleSheet } from 'react-native-web';
import { CircularProgress} from 'react-native-circular-progress-indicator';

const LeftContent = props => <Avatar.Icon {...props} icon="cards-outline" />

const MyComponent = () => (
    <Card style={{margin:100, backgroundColor: '#FFFFFF'}}>
      <Card.Title title="Cards Progress" left={LeftContent}/>
      <Card.Content>
        <Text variant="titleLarge">Progress Bar</Text>
        <View>
        <CircularProgress
        value={60}
        radius={120}
        duration={2000}
        progressValueColor={'#ecf0f1'}
        maxValue={200}
        title={'Cards'}
        titleColor={'black'}
        titleStyle={{fontWeight: 'bold'}}
        valueSuffix={'%'}
        />
        </View>
      </Card.Content>
      <Card.Actions>
        <Button>Fuck off</Button>
        <Button>¡Let's keep the streak!</Button>
      </Card.Actions>
    </Card>
  );
export default MyComponent;
