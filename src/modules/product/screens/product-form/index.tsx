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

const ProductForm = (props: any) => {
  const {
    form,
    isEdit,
    isLoading,
    action: {setForm, onRawChange, onSubmit},
  } = useProductForm(props);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Tambah Produk" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <InputTextMain
            {...form.name}
            onChangeText={value => setForm('name', value)}
          />
          <InputTextMain
            {...form.price}
            onChangeText={value => setForm('price', value)}
          />
          <InputProductRaw
            {...form.raws}
            onChange={onRawChange}
          />
          <InputMedia
            {...form.productImage}
            onChangeImage={value => setForm('productImage', value)}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain title={'Simpan'} isLoading={isLoading} onPress={onSubmit} />
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
