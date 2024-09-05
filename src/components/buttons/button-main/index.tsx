import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {FC} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';

export interface ButtonMainProps {
  title: string;
  onPress?(): void;
}

const ButtonMain: FC<ButtonMainProps> = props => {
  const {title, onPress} = props;
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ButtonMain;

const styles = StyleSheet.create({
  container: {
    backgroundColor: palettes.primary,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    ...fonts.h6,
    color: palettes.background,
    textAlign: 'center',
  },
});
