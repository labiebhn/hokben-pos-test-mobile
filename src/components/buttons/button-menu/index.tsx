import React, {FC} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';

export interface ButtonMenuProps {
  title: string;
  onPress?(): void;
}

const ButtonMenu: FC<ButtonMenuProps> = props => {
  const {title, onPress} = props;
  const styles = useStyles();
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonMenu;

const useStyles = () => {
  const {width} = useWindowDimensions();
  const size = width / 2 - 38;
  return StyleSheet.create({
    container: {
      backgroundColor: palettes.background,
      width: size,
      height: size,
      borderRadius: 8,
      elevation: palettes.elevationMedium,
      shadowColor: '#00000038',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.5,
      shadowRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      borderWidth: 1,
      borderColor: palettes.primary,
    },
    title: {
      ...fonts.h4,
      textAlign: 'center',
    },
  });
};
