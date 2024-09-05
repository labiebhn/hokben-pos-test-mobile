import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {ButtonMenu} from '../../../../components/buttons';
import fonts from '../../../../utils/fonts';

const Home = ({navigation}: any) => {
  const nav = (key: string) => {
    navigation.navigate(key);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Hokben POS</Text>
          <View style={styles.menu}>
            <ButtonMenu title={'Kasir'} onPress={() => nav('cashier')} />
            <ButtonMenu
              title={'Riwayat Transaksi'}
              onPress={() => nav('transaction-list')}
            />
            <ButtonMenu title={'Produk'} onPress={() => nav('product-list')} />
            <ButtonMenu title={'Bahan Baku'} onPress={() => nav('raw-list')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palettes.background,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 36,
    rowGap: 36,
    marginTop: 44,
  },
  title: {
    ...fonts.h1,
    textAlign: 'center',
  },
});
