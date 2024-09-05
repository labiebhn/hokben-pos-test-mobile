import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {
  InputMedia,
  InputProductRaw,
  InputTextMain,
} from '../../../../components/forms';
import {useProductForm} from './functions';
import {ButtonMain} from '../../../../components/buttons';

const ProductForm = () => {
  const {
    form,
    action: {setForm},
  } = useProductForm();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Tambah Produk" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <InputTextMain
            {...form.productName}
            onChangeText={value => setForm('productName', value)}
          />
          <InputTextMain
            {...form.productPrice}
            onChangeText={value => setForm('productPrice', value)}
          />
          <InputProductRaw {...form.productRaw} />
          <InputMedia {...form.productImage} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain title={'Simpan'} />
      </View>
    </SafeAreaView>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palettes.background,
  },
  container: {
    padding: 16,
    rowGap: 16,
  },
  footer: {
    padding: 16,
  },
});
