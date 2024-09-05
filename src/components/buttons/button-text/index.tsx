import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import fonts from '../../../utils/fonts';
import palettes from '../../../utils/palettes';

export interface ButtonTextProps {
  title: string;
  onPress?(): void;
}

const ButtonText: FC<ButtonTextProps> = props => {
  const {title, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  title: {
    ...fonts.h7,
    color: palettes.primary,
  },
});
