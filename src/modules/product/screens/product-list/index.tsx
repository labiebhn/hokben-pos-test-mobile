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
import CardProduct from '../../../../components/cards/card-product';
import {ButtonMain} from '../../../../components/buttons';
import {useProductList} from './functions';
import {mapRawData} from '../../../../utils/helpers';

const ProductList = (props: any) => {
  const {
    data,
    isLoading,
    refreshing,
    action: {goToForm, onRefresh, onEdit, askForDelete},
  } = useProductList(props);

  const renderList = () => {
    if (!data) {
      return isLoading ? <ActivityIndicator size={'large'} /> : null;
    }
    return data.map((item: any, index: any) => {
      const mappedRaw = mapRawData(item?.raws);
      return (
        <CardProduct
          key={index?.toString()}
          mode={'setting'}
          title={item?.name}
          price={item?.price}
          imageUri={item?.imageUri}
          raw={mappedRaw}
          onEditPress={() => onEdit(item)}
          onDeletePress={() => askForDelete(item)}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title="Produk" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>{renderList()}</View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain title={'Tambah Produk'} isLoading={isLoading} onPress={goToForm} />
      </View>
    </SafeAreaView>
  );
};

export default ProductList;

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
