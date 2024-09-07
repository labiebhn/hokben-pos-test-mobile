import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import palettes from '../../../../utils/palettes';
import {Line, Navbar} from '../../../../components/layouts';
import {ButtonMain} from '../../../../components/buttons';
import {useCheckout} from './functions';
import fonts from '../../../../utils/fonts';
import {currency} from '../../../../utils/helpers';
import {METHOD_ORDER} from '../../../../constants/order';

const Checkout = (props: any) => {
  const {
    data,
    methodOrder,
    totalBill,
    totalPackaging,
    grandTotal,
    isLoading,
    action: {setMethodOrder, onSubmit},
  } = useCheckout(props);

  const renderList = () => {
    if (!data) return <ActivityIndicator size={'large'} />;
    return data.map((item, index) => {
      const calcPrice = Number(item?.price) * Number(item?.qty);
      return (
        <View style={styles.list}>
          <Text style={styles.listVal}>{item?.name}</Text>
          <Text style={[styles.listVal, {textAlign: 'center'}]}>
            Rp{currency(item?.price)} x {item?.qty}
          </Text>
          <Text style={[styles.listVal, {textAlign: 'right'}]}>
            Rp{currency(calcPrice)}
          </Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Checkout'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>Pilih Metode Pesanan</Text>
          <View style={styles.action}>
            <ButtonMain
              size={'sm'}
              mode={'select'}
              title={'Makan Di Tempat'}
              active={methodOrder === METHOD_ORDER.DINE_IN}
              onPress={() => setMethodOrder(METHOD_ORDER.DINE_IN)}
            />
            <ButtonMain
              size={'sm'}
              mode={'select'}
              title={'Bawa Pulang'}
              active={methodOrder === METHOD_ORDER.TAKE_AWAY}
              onPress={() => setMethodOrder(METHOD_ORDER.TAKE_AWAY)}
            />
          </View>
          <View style={{height: 28}} />
          <Text style={styles.title}>Rincian Pesanan</Text>
          <View style={styles.lists}>{renderList()}</View>
          <Line marginVertical={16} />
          <View style={styles.summary}>
            <View style={styles.list}>
              <Text style={styles.summaryVal}>Biaya Kemasan</Text>
              <Text style={styles.summaryVal}>
                Rp{currency(totalPackaging)}
              </Text>
            </View>
            <View style={styles.list}>
              <Text style={fonts.h4}>Total</Text>
              <Text style={styles.summaryVal}>Rp{currency(grandTotal)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain
          title={'Buat Pesanan'}
          isLoading={isLoading}
          onPress={onSubmit}
        />
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
  lists: {
    marginTop: 16,
    rowGap: 8,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listVal: {
    ...fonts.h6,
    fontWeight: 'normal',
    flex: 1,
  },
  title: {
    ...fonts.h4,
  },
  action: {
    flexDirection: 'row',
    marginTop: 8,
    columnGap: 8,
  },
  summaryVal: {
    ...fonts.h6,
    fontWeight: 'normal',
  },
  summary: {
    rowGap: 16,
  },
});
