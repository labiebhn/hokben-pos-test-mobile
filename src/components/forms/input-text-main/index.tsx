import React, {FC, ReactNode, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import fonts from '../../../utils/fonts';
import palettes from '../../../utils/palettes';

export type InputTextMainType =
  | 'default'
  | 'currency'
  | 'password'
  | 'search'
  | 'textarea'
  | 'phone-number'
  | 'number-pad'
  | 'percentage'
  | undefined;
export interface InputTextMainProps extends TextInputProps {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  type?: InputTextMainType;
  error?: boolean;
  message?: string;
  debounce?: number;
  styleContainer?: any;
  required?: boolean;
  isLoading?: boolean;
}

const InputTextMain: FC<InputTextMainProps> = ({
  iconLeft,
  iconRight,
  label,
  type,
  placeholder,
  value,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize,
  error,
  message,
  debounce = 500,
  required,
  styleContainer,
  editable,
  autoFocus,
  isLoading,
  onSubmitEditing,
  onChangeText,
}) => {
  const styles = useStyles(type, error, editable);

  const [tempValue, setTempValue] = useState(value || '');
  const [secure, setSecure] = useState(secureTextEntry);

  useEffect(() => {
    if (type === 'password') {
      setSecure(true);
    }
  }, [type]);

  useEffect(() => {
    let cancel = false;
    if (type === 'search') {
      setTimeout(() => {
        if (!cancel) {
          onChangeText?.(tempValue);
        }
      }, debounce);
    }
    return () => {
      cancel = true;
    };
  }, [debounce, tempValue, type]);

  const handleChangeText = (text: any) => {
    if (type === 'search') {
      setTempValue(text);
    } else {
      let result = '';
      switch (type) {
        case 'number-pad':
          text = text.replace(/\D/g, '');
          result = `${Number(text || 0)}`;
          break;
        default:
          result = text;
          break;
      }
      onChangeText?.(result);
    }
  };

  const renderInput = () => {
    if (type === 'currency' || type === 'percentage') {
      return (
        <CurrencyInput
          value={Number(value)}
          placeholder={placeholder}
          editable={editable}
          autoFocus={autoFocus}
          placeholderTextColor={palettes.textPlaceholder}
          keyboardType={'number-pad'}
          precision={0}
          delimiter={type === 'currency' ? '.' : ''}
          prefix={type === 'currency' ? 'Rp' : ''}
          suffix={type === 'percentage' ? '%' : ''}
          onSubmitEditing={onSubmitEditing}
          onChangeValue={handleChangeText}
          style={styles.input}
        />
      );
    } else {
      return (
        <TextInput
          value={`${value}`}
          placeholder={placeholder}
          editable={editable}
          autoFocus={autoFocus}
          placeholderTextColor={palettes.textPlaceholder}
          secureTextEntry={secure}
          autoCapitalize={autoCapitalize}
          keyboardType={
            type === 'phone-number'
              ? 'phone-pad'
              : type === 'number-pad'
              ? type
              : keyboardType
          }
          multiline={type === 'textarea'}
          numberOfLines={type === 'textarea' ? 4 : 1}
          onSubmitEditing={onSubmitEditing}
          onChangeText={handleChangeText}
          style={styles.input}
        />
      );
    }
  };

  return (
    <View style={[styles.container, styleContainer]}>
      {label ? (
        <View style={styles.info}>
          <Text style={styles.label}>
            {label} {required ? <Text style={styles.required}> *</Text> : null}
          </Text>
        </View>
      ) : null}
      <View style={styles.form}>
        {iconLeft ? <View style={styles.icon}>{iconLeft}</View> : null}
        {renderInput()}
        {iconRight ? <View style={styles.icon}>{iconRight}</View> : null}
        {isLoading ? (
          <View style={styles.icon}>
            <ActivityIndicator />
          </View>
        ) : null}
      </View>
      {message ? <Text style={styles.helper}>{message}</Text> : null}
    </View>
  );
};

export default InputTextMain;

const useStyles = (
  type: InputTextMainType,
  error: any,
  editable: boolean = true,
) => {
  return StyleSheet.create({
    container: {
      width: '100%',
    },
    form: {
      backgroundColor: editable ? palettes.background : palettes.card,
      borderRadius: type === 'search' ? 80 : 6,
      borderWidth: 1,
      borderColor: error ? palettes.danger : palettes.border,
      paddingHorizontal: type === 'search' ? 16 : 8,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
    },
    input: {
      ...fonts.input,
      flex: 1,
      color: palettes.text,
      paddingVertical: Platform.OS === 'android' ? 8 : 12,
      paddingHorizontal: Platform.OS === 'android' ? 4 : 8,
      height: type === 'textarea' ? 90 : 'auto',
      textAlignVertical: type === 'textarea' ? 'top' : 'center',
      paddingTop: Platform.OS === 'ios' && type === 'textarea' ? 10 : 12,
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      ...fonts.label,
      color: palettes.text,
    },
    helper: {
      ...fonts.small,
      color: palettes.danger,
      marginTop: 6,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    required: {
      ...fonts.label,
      color: palettes.danger,
    },
    prefixLeft: {
      backgroundColor: palettes.card,
      height: '100%',
      marginLeft: -8,
      paddingHorizontal: 10,
      borderRightWidth: 1,
      borderRightColor: palettes.border,
    },
    prefixWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    prefixText: {
      ...fonts.h7,
      textAlign: 'center',
    },
  });
};
