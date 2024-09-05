import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import palettes from '../../../utils/palettes';
import FastImage from 'react-native-fast-image';
import {ImageEmpty} from '../../../assets';
import fonts from '../../../utils/fonts';
import {ButtonMain, ButtonText} from '../../buttons';
import {NumberSpinner} from '../../forms';
import {getRawName, imageUrl} from '../../../utils/helpers';

export type CardProductMode = 'cashier' | 'cart' | 'setting';

export interface CardProductProps {
  mode: CardProductMode;
  title?: string;
  raw?: any;
  imageUri?: string;
  onDeletePress?(): void;
  onEditPress?(): void;
}

const CardProduct: FC<CardProductProps> = props => {
  const {mode, title, raw, imageUri, onDeletePress, onEditPress} = props;

  const isSetting = mode === 'setting';
  const isCashier = mode === 'cashier';
  const isCart = mode === 'cart';

  const rawName = useMemo(() => {
    return getRawName(raw);
  }, [raw]);

  const actionView = () => {
    if (isCashier) {
      return (
        <View style={styles.action}>
          <ButtonMain size={'sm'} title={'Tambahkan ke Keranjang'} />
        </View>
      );
    }
    if (isCart) {
      return (
        <View style={styles.action}>
          <NumberSpinner />
        </View>
      );
    }
    return (
      <View style={styles.action}>
        <ButtonText title={'Edit'} onPress={onEditPress} />
        <ButtonText title={'Hapus'} onPress={onDeletePress} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={imageUri ? {uri: imageUrl(imageUri)} : ImageEmpty}
        style={styles.img}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {isSetting && <Text style={styles.desc}>Bahan Baku: {rawName}</Text>}
        {actionView()}
      </View>
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palettes.border,
  },
  img: {
    width: 74,
    height: 74,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
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
    marginTop: 8,
    columnGap: 16,
  },
});
