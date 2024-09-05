import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';
import {ButtonMain, ButtonText} from '../../buttons';
import {InputTextMain} from '../../forms';

export interface CardRawProps {
  selection?: boolean;
  value?: any;
  onValueChange?(value: string): void;
}

const CardRaw: FC<CardRawProps> = props => {
  const {selection, value, onValueChange} = props;

  const actionView = () => {
    if (selection) {
      return (
        <View style={styles.action}>
          {value ? (
            <InputTextMain
              styleContainer={{width: 150}}
              label={'Penggunaan Bahan Baku'}
              value={value}
              onChangeText={onValueChange}
            />
          ) : null}
          <ButtonMain size={'sm'} title={value ? 'Batal Pilih' : 'Pilih'} />
        </View>
      );
    }
    return (
      <View style={styles.action}>
        <ButtonText title={'Edit'} />
        <ButtonText title={'Hapus'} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bakpao Keju</Text>
      {actionView()}
    </View>
  );
};

export default CardRaw;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palettes.border,
  },
  title: {
    ...fonts.h4,
  },
  desc: {
    ...fonts.p,
    marginTop: 4,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    columnGap: 16,
  },
});
