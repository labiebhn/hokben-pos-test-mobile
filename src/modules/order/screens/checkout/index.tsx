import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {ButtonMain} from '../../../../components/buttons';

const Checkout = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Checkout'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text>Checkout</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain title={'Buat Pesanan'} />
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

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
