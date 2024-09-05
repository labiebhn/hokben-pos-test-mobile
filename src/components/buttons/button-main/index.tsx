import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {FC} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';

type ButtonMainSize = 'sm' | 'md' | 'lg' | undefined;
export interface ButtonMainProps {
  title: string;
  size?: ButtonMainSize;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?(): void;
}

const ButtonMain: FC<ButtonMainProps> = props => {
  const {title, size, isLoading, disabled, onPress} = props;
  const styles = useStyles(size, disabled);
  return (
    <TouchableNativeFeedback disabled={disabled || isLoading} onPress={onPress}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={palettes.background} />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

export default ButtonMain;

const useStyles = (size: ButtonMainSize, disabled?: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: palettes.primary,
      padding: size === 'sm' ? 8 : 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: disabled ? 0.7 : 1,
    },
    title: {
      ...fonts.h6,
      color: palettes.background,
      textAlign: 'center',
    },
  });
