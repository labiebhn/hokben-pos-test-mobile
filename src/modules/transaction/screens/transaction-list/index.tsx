import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';

const TransactionList = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Riwayat Transaksi'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text>TransactionList</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palettes.background,
  },
  container: {},
});
