import * as React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const ProgressBar = () => (
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
)



export default ProgressBar;

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