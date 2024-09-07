import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import palettes from '../../../../utils/palettes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTransactionDetail} from './functions';
import {Line, Navbar} from '../../../../components/layouts';
import fonts from '../../../../utils/fonts';
import moment from 'moment';
import {currency} from '../../../../utils/helpers';
import {METHOD_ORDER} from '../../../../constants/order';

const TransactionDetail = (props: any) => {
  const {
    data,
    isLoading,
    refreshing,
    action: {onRefresh},
  } = useTransactionDetail(props);

  const renderList = () => {
    const details = data?.transactionDetails;
    if (!details) return;
    return details.map((item: any, index: any) => {
      return (
        <View style={styles.list}>
          <Text style={styles.listVal}>{item?.product?.name}</Text>
          <Text style={[styles.listVal, {textAlign: 'center'}]}>
            Rp{currency(item?.productPrice)} x {item?.qty}
          </Text>
          <Text style={[styles.listVal, {textAlign: 'right'}]}>
            Rp{currency(item?.total)}
          </Text>
        </View>
      );
    });
  };

  const renderContent = () => {
    if (!data) {
      if (!isLoading) return <ActivityIndicator size={'large'} />;
      return;
    }
    return (
      <>
        <View style={styles.content}>
          <Text style={fonts.label}>Invoice: {data?.invoice}</Text>
          <Text style={fonts.label}>
            Tanggal Transaksi:{' '}
            {moment(data?.createdAt).format('DD-MM-YYYY, HH:mm:ss')}
          </Text>
          <Text style={fonts.label}>
            Total Transaksi: {currency(data?.grandTotal)}
          </Text>
          <Text style={fonts.label}>
            Metode Pesanan:{' '}
            {data?.orderMethod === METHOD_ORDER.DINE_IN
              ? 'Makan Di Tempat'
              : 'Bawa Pulang'}
          </Text>
        </View>
        <View style={{height: 16}} />
        <View style={styles.content}>
          {renderList()}
          <Line />
          <View style={styles.list}>
            <Text style={fonts.label}>Subtotal</Text>
            <Text style={fonts.label}>Rp{currency(data?.productTotal)}</Text>
          </View>
          <View style={styles.list}>
            <Text style={fonts.label}>Biaya Kemasan</Text>
            <Text style={fonts.label}>Rp{currency(data?.packagingTotal)}</Text>
          </View>
          <View style={styles.list}>
            <Text style={fonts.label}>Total</Text>
            <Text style={fonts.label}>Rp{currency(data?.grandTotal)}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Detail Transaksi'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>{renderContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palettes.background,
  },
  container: {
    padding: 16,
  },
  content: {
    rowGap: 8,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listVal: {
    ...fonts.label,
    fontWeight: 'normal',
    flex: 1,
  },
});
