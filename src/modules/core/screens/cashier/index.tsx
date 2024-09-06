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
import {CardProduct} from '../../../../components/cards';
import {ButtonMain} from '../../../../components/buttons';
import {useCashier} from './functions';

const Cashier = (props: any) => {
  const {
    data,
    refreshing,
    isLoading,
    totalQtyCart,
    enableSubmit,
    action: {goToCart, onRefresh, onAddToCart},
  } = useCashier(props);

  const renderList = () => {
    if (!data) {
      return isLoading ? <ActivityIndicator size={'large'} /> : null;
    }
    return data.map((item: any, index: any) => {
      return (
        <CardProduct
          key={index?.toString()}
          mode={'cashier'}
          title={item?.name}
          price={item?.price}
          imageUri={item?.imageUri}
          onCartPress={() => onAddToCart(item)}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={'Kasir'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>{renderList()}</View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain
          title={`Keranjang (${totalQtyCart})`}
          disabled={!enableSubmit}
          onPress={goToCart}
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
    rowGap: 16,
  },
  footer: {
    padding: 16,
  },
});
