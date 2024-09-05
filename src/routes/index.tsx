import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {defaultOptions} from './configs';
import Home from '../modules/core/screens/home';
import ProductList from '../modules/product/screens/product-list';
import ProductForm from '../modules/product/screens/product-form';
import RawForm from '../modules/product/screens/raw-form';
import RawList from '../modules/product/screens/raw-list';
import TransactionList from '../modules/transaction/screens/transaction-list';
import TransactionDetail from '../modules/transaction/screens/transaction-detail';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="product-list" component={ProductList} />
        <Stack.Screen name="product-form" component={ProductForm} />
        <Stack.Screen name="raw-list" component={RawList} />
        <Stack.Screen name="raw-form" component={RawForm} />
        <Stack.Screen name="transaction-list" component={TransactionList} />
        <Stack.Screen name="transaction-detail" component={TransactionDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
