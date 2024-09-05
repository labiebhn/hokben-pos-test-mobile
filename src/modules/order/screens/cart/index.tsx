import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {ButtonMain} from '../../../../components/buttons';
import {CardProduct} from '../../../../components/cards';

const Cart = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Keranjang'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <CardProduct mode={'cart'} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain
          title={'Checkout'}
          onPress={() => navigation.navigate('checkout')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

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
