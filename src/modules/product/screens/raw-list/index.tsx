import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {RAW_LIST_PARAMS_TYPE} from '../../../../constants/product';
import {ButtonMain} from '../../../../components/buttons';
import {CardRaw} from '../../../../components/cards';

const RawList = ({navigation, route}: any) => {
  const {params} = route;
  const isSelection = params?.type === RAW_LIST_PARAMS_TYPE.SELECT;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={isSelection ? 'Pilih Bahan Baku' : 'Bahan Baku'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <CardRaw selection={isSelection} />
          <CardRaw selection={isSelection} />
          <CardRaw selection={isSelection} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain
          title={'Tambah Bahan Baku'}
          onPress={() => navigation.navigate('raw-form')}
        />
      </View>
    </SafeAreaView>
  );
};

export default RawList;

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
