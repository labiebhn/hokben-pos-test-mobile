import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import palettes from '../../../utils/palettes';
import fonts from '../../../utils/fonts';
import {ButtonMain, ButtonText} from '../../buttons';
import {InputTextMain} from '../../forms';

export interface CardRawProps {
  selection?: boolean;
  value?: any;
  title?: string;
  onValueChange?(value: string): void;
  onEditPress?(): void;
  onDeletePress?(): void;
  toggleSelectPress?(): void;
}

const CardRaw: FC<CardRawProps> = props => {
  const {
    selection,
    value,
    title,
    onEditPress,
    onDeletePress,
    onValueChange,
    toggleSelectPress,
  } = props;

  const actionView = () => {
    if (selection) {
      return (
        <View style={styles.action}>
          {value != null ? (
            <InputTextMain
              styleContainer={{width: 100}}
              label={'Penggunaan Bahan Baku (gram)'}
              value={value}
              type={'number-pad'}
              onChangeText={onValueChange}
            />
          ) : null}
          <ButtonMain
            size={'sm'}
            title={value != null ? 'Batal Pilih' : 'Pilih'}
            onPress={toggleSelectPress}
          />
        </View>
      );
    }
    return (
      <View style={styles.action}>
        <ButtonText title={'Ubah'} onPress={onEditPress} />
        <ButtonText title={'Hapus'} onPress={onDeletePress} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
