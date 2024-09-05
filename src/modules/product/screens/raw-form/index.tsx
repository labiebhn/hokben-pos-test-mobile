import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {InputTextMain} from '../../../../components/forms';
import {useRawForm} from './functions';
import {ButtonMain} from '../../../../components/buttons';

const RawForm = (props: any) => {
  const {
    form,
    isLoading,
    action: {setForm, onSubmit},
  } = useRawForm(props);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Tambah Bahan Baku" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <InputTextMain
            {...form.name}
            onChangeText={value => setForm('name', value)}
          />
          <InputTextMain
            {...form.pricePerKg}
            onChangeText={value => setForm('pricePerKg', value)}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain title={'Simpan'} isLoading={isLoading} onPress={onSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default RawForm;

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
