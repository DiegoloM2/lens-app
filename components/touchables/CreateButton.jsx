import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { FAB } from 'react-native-paper';

const CreateButton = ({
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
    bottom: 15,
    right: 16,
    position: 'absolute',
  },
});