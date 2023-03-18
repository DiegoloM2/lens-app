import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  
  StyleSheet,
  Platform,
} from 'react-native';
import { AnimatedFAB, FAB } from 'react-native-paper';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const CreateButton = ({
    label,
    visible,
    style,
    to
}) => {
    const navigator = useNavigation();
  return (
      <FAB
        icon={'plus'}
        // label={label}
        extended={false}
        onPress={() => navigator.push(to)}
        visible={visible}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle, style]}

      />
  );
};

export default CreateButton;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 100,
    right: 16,
    position: 'absolute',
  },
});