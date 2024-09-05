import React, {FC, ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  View,
} from 'react-native';

export interface KeyboardWrapperProps extends KeyboardAvoidingViewProps {
  children: ReactNode;
}

const KeyboardWrapper: FC<KeyboardWrapperProps> = props => {
  const {children} = props;
  if (Platform.OS === 'ios') {
    return <KeyboardAvoidingView {...props}>{children}</KeyboardAvoidingView>;
  } else {
    return <View {...props}>{children}</View>;
  }
};

export default KeyboardWrapper;
