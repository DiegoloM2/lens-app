import * as React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text } from "react-native"

// https://www.npmjs.com/package/react-native-circular-progress 
const ProgressBar = (props) => (
  <AnimatedCircularProgress
    size={150}
    width={5}
    fill={59}
    tintColor="blue"
    backgroundColor="rgba(150,150,150,0.1)" 
    rotation="0"
    lineCap="round"
    backgroundWidth="25" {...props}>
      {(fill) => <Text style = {{color: "rgba(150,150,150,1)", fontSize: 25}}>{`${Math.round(fill)}%`}</Text>}

    </AnimatedCircularProgress>
)



export default ProgressBar;
