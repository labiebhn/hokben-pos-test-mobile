import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {
  InputMedia,
  InputProductRaw,
  InputTextMain,
} from '../../../../components/forms';
import {useRawForm} from './functions';

const ProductForm = () => {
  const {
    form,
    action: {setForm},
  } = useRawForm();
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Tambah Bahan Baku" />
      <View style={styles.container}>
        <InputTextMain
          {...form.rawName}
          onChangeText={value => setForm('rawName', value)}
        />
        <InputTextMain
          {...form.rawPrice}
          onChangeText={value => setForm('rawPrice', value)}
        />
        <InputTextMain
          {...form.rawStock}
          onChangeText={value => setForm('rawStock', value)}
        />
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
});
