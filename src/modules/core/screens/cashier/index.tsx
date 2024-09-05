import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {CardProduct} from '../../../../components/cards';
import {ButtonMain} from '../../../../components/buttons';

const Cashier = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Kasir'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <CardProduct mode={'cashier'} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain
          title={'Keranjang'}
          onPress={() => navigation.navigate('cart')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cashier;

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
