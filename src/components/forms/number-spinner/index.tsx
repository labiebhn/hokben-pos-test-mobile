import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import fonts from '../../../utils/fonts';
import {ButtonMain} from '../../buttons';

export interface NumberSpinnerProps {
  value?: number;
  onAddPress?(value: number): void;
  onMinPress?(value: number): void;
}

const NumberSpinner: FC<NumberSpinnerProps> = props => {
  const {value, onAddPress, onMinPress} = props;

  const numberValue: number = Number(value) || 0;

  const min = () => {
    let result = numberValue;
    if (numberValue) result -= 1;
    onMinPress?.(result);
  };

  const plus = () => {
    onAddPress?.(numberValue + 1);
  };

  return (
    <View style={styles.container}>
      <ButtonMain size={'sm'} title={'-'} onPress={min} />
      <Text style={styles.value}>{numberValue}</Text>
      <ButtonMain size={'sm'} title={'+'} onPress={plus} />
    </View>
  );
};

export default NumberSpinner;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    ...fonts.h6,
    width: 40,
    textAlign: 'center',
    marginHorizontal: 4,
  },
});
