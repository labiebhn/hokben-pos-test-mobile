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
import {Navbar} from '../../../../components/layouts';
import {ButtonMain} from '../../../../components/buttons';
import {CardProduct} from '../../../../components/cards';
import {useCart} from './functions';
import {currency} from '../../../../utils/helpers';
import fonts from '../../../../utils/fonts';

const Cart = (props: any) => {
  const {
    data,
    enableSubmit,
    totalBill,
    action: {goToCheckout, onSpinnerChange},
  } = useCart(props);

  const renderList = () => {
    if (!data) {
      return <ActivityIndicator size={'large'} />;
    }
    return data.map((item: any, index: any) => {
      const calcPrice = Number(item?.price) * Number(item?.qty);
      return (
        <CardProduct
          key={index?.toString()}
          mode={'cart'}
          title={item?.name}
          price={calcPrice}
          value={item?.qty}
          imageUri={item?.imageUri}
          onValueChange={value => onSpinnerChange(index, value)}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Keranjang'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>{renderList()}</View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rp{currency(totalBill)}</Text>
        <ButtonMain
          title={'Checkout'}
          disabled={!enableSubmit}
          onPress={goToCheckout}
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
    rowGap: 16,
  },
  footer: {
    padding: 16,
  },
  total: {
    ...fonts.h4,
    marginBottom: 4,
  },
});
