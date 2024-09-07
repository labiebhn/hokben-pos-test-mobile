import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Navbar} from '../../../../components/layouts';
import {useTransactionList} from './functions';
import {CardTransaction} from '../../../../components/cards';

const TransactionList = (props: any) => {
  const {
    isLoading,
    data,
    refreshing,
    action: {onRefresh, goToDetail},
  } = useTransactionList(props);

  const renderList = () => {
    if (!data) {
      if (isLoading) return <ActivityIndicator size={'large'} />;
      return;
    }
    return data.map((item: any, index: any) => {
      return (
        <CardTransaction
          key={index?.toString()}
          data={item}
          onPress={() => goToDetail(item?.id)}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Riwayat Transaksi'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>{renderList()}</View>
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
  container: {
    padding: 16,
    rowGap: 16,
  },
});
