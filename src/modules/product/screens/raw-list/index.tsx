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
import {ButtonMain} from '../../../../components/buttons';
import {CardRaw} from '../../../../components/cards';
import {useRawList} from './functions';

const RawList = (props: any) => {
  const {
    isSelection,
    data,
    isLoading,
    refreshing,
    enableSubmit,
    action: {
      onRefresh,
      onEdit,
      askForDelete,
      toggleSelectRaw,
      getSelectedRawData,
      usageInGramChange,
      onSubmit,
    },
  } = useRawList(props);

  const renderList = () => {
    if (!data) {
      return isLoading ? <ActivityIndicator size={'large'} /> : null;
    }
    return data.map((item: any, index: any) => {
      const selectedData: any = getSelectedRawData(item) || {};
      return (
        <CardRaw
          key={index?.toString()}
          selection={isSelection}
          title={item?.name}
          value={selectedData?.usageInGram}
          onValueChange={value => usageInGramChange(item, value)}
          onEditPress={() => onEdit(item)}
          onDeletePress={() => askForDelete(item)}
          toggleSelectPress={() => toggleSelectRaw(item)}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar title={isSelection ? 'Pilih Bahan Baku' : 'Bahan Baku'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>{renderList()}</View>
      </ScrollView>
      <View style={styles.footer}>
        <ButtonMain
          title={isSelection ? 'Simpan' : 'Tambah Bahan Baku'}
          isLoading={isLoading}
          disabled={!enableSubmit}
          onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default RawList;

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
