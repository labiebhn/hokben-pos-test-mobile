import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {FC} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';
import moment from 'moment';
import {currency} from '../../../utils/helpers';

export interface CardTransactionProps {
  data: any;
  onPress?(): void;
}

const CardTransaction: FC<CardTransactionProps> = props => {
  const {data, onPress} = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.value}>Invoice: {data?.invoice}</Text>
        <Text style={styles.value}>
          Tanggal Transaksi:{' '}
          {moment(data?.createdAt).format('DD-MM-YYYY, HH:mm:ss')}
        </Text>
        <Text style={styles.value}>
          Total Transaksi: {currency(data?.grandTotal)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardTransaction;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: palettes.background,
    borderWidth: 1,
    borderColor: palettes.border,
    rowGap: 8,
  },
  value: {
    ...fonts.label,
  },
});
