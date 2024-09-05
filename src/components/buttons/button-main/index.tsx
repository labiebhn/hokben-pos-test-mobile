import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React, {FC} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';

type ButtonMainSize = 'sm' | 'md' | 'lg' | undefined;
export interface ButtonMainProps {
  title: string;
  size?: ButtonMainSize;
  onPress?(): void;
}

const ButtonMain: FC<ButtonMainProps> = props => {
  const {title, size, onPress} = props;
  const styles = useStyles(size);
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ButtonMain;

const useStyles = (size: ButtonMainSize) =>
  StyleSheet.create({
    container: {
      backgroundColor: palettes.primary,
      padding: size === 'sm' ? 8 : 16,
      borderRadius: 8,
    },
    title: {
      ...fonts.h6,
      color: palettes.background,
      textAlign: 'center',
    },
  });
