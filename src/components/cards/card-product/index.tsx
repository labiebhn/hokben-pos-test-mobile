import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import palettes from '../../../utils/palettes';
import FastImage from 'react-native-fast-image';
import {ImageEmpty} from '../../../assets';
import fonts from '../../../utils/fonts';
import {ButtonMain, ButtonText} from '../../buttons';
import {NumberSpinner} from '../../forms';
import {currency, getRawName, imageUrl} from '../../../utils/helpers';

export type CardProductMode = 'cashier' | 'cart' | 'setting';

export interface CardProductProps {
  mode: CardProductMode;
  title?: string;
  price?: number;
  raw?: any;
  imageUri?: string;
  value?: number;
  onValueChange?(value: number): void;
  onDeletePress?(): void;
  onEditPress?(): void;
  onCartPress?(): void;
}

const CardProduct: FC<CardProductProps> = props => {
  const {
    mode,
    title,
    price,
    raw,
    imageUri,
    value,
    onValueChange,
    onDeletePress,
    onEditPress,
    onCartPress,
  } = props;

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
          <ButtonMain
            size={'sm'}
            title={'Tambahkan ke Keranjang'}
            onPress={onCartPress}
          />
        </View>
      );
    }
    if (isCart) {
      return (
        <View style={styles.action}>
          <NumberSpinner
            value={value}
            onAddPress={onValueChange}
            onMinPress={onValueChange}
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
      <FastImage
        source={imageUri ? {uri: imageUrl(imageUri)} : ImageEmpty}
        style={styles.img}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.title, {fontWeight: 'bold'}]}>
          Rp{currency(price)}
        </Text>
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
    fontWeight: 'normal',
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
