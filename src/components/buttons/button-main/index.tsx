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
type ButtonMainMode = 'select' | undefined;
export interface ButtonMainProps {
  title: string;
  size?: ButtonMainSize;
  mode?: ButtonMainMode;
  active?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?(): void;
}

const ButtonMain: FC<ButtonMainProps> = props => {
  const {title, size, mode, active, isLoading, disabled, onPress} = props;
  const styles = useStyles(size, disabled, mode, active);
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

const useStyles = (
  size: ButtonMainSize,
  disabled?: boolean,
  mode?: ButtonMainMode,
  active?: boolean,
) => {
  const isSelect = mode === 'select';
  return StyleSheet.create({
    container: {
      backgroundColor: isSelect ? palettes.background : palettes.primary,
      padding: size === 'sm' ? 8 : 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: disabled ? 0.7 : 1,
      borderWidth: 1,
      borderColor: isSelect && !active ? palettes.border : palettes.primary,
    },
    title: {
      ...fonts.h6,
      color: isSelect
        ? active
          ? palettes.primary
          : palettes.text
        : palettes.background,
      textAlign: 'center',
    },
  });
};
