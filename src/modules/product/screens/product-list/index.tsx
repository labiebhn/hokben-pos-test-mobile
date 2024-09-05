import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import CardProduct from '../../../../components/cards/card-product';
import {ButtonMain} from '../../../../components/buttons';

const ProductList = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Produk" />
      <ScrollView>
        <View style={styles.container}>
          <CardProduct />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain title={'Tambah Produk'} />
      </View>
    </SafeAreaView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palettes.background,
  },
  container: {
    padding: 16,
  },
  footer: {
    padding: 16,
  },
});
