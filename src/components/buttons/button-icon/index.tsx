import React, {FC, ReactNode} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';

export interface ButtonIconProps extends TouchableWithoutFeedbackProps {
  icon: ReactNode;
}

const ButtonIcon: FC<ButtonIconProps> = props => {
  const {icon, style, disabled} = props;
  const styles = useStyles(disabled);
  return (
    <TouchableWithoutFeedback {...props}>
      <View style={[styles.container, style]}>{icon}</View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonIcon;

const useStyles = (disabled?: boolean) => {
  return StyleSheet.create({
    container: {
      opacity: disabled ? 0.5 : 1,
    },
  });
};
