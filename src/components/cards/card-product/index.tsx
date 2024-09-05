import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import palettes from '../../../utils/palettes';
import FastImage from 'react-native-fast-image';
import {ImageEmpty} from '../../../assets';
import fonts from '../../../utils/fonts';
import {ButtonText} from '../../buttons';

const CardProduct = () => {
  return (
    <View style={styles.container}>
      <FastImage source={ImageEmpty} style={styles.img} />
      <View style={styles.content}>
        <Text style={styles.title}>Bakpao Keju</Text>
        <Text style={styles.desc}>Bahan Baku: </Text>
        <View style={styles.action}>
          <ButtonText title={'Edit'} />
          <ButtonText title={'Hapus'} />
        </View>
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
