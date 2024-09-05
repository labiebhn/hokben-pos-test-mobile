import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {defaultOptions} from './configs';
import Home from '../modules/core/screens/home';
import Cashier from '../modules/core/screens/cashier';
import ProductList from '../modules/product/screens/product-list';
import ProductForm from '../modules/product/screens/product-form';
import RawForm from '../modules/product/screens/raw-form';
import RawList from '../modules/product/screens/raw-list';
import TransactionList from '../modules/transaction/screens/transaction-list';
import TransactionDetail from '../modules/transaction/screens/transaction-detail';
import Cart from '../modules/order/screens/cart';
import Checkout from '../modules/order/screens/checkout';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="cashier" component={Cashier} />
        <Stack.Screen name="product-list" component={ProductList} />
        <Stack.Screen name="product-form" component={ProductForm} />
        <Stack.Screen name="raw-list" component={RawList} />
        <Stack.Screen name="raw-form" component={RawForm} />
        <Stack.Screen name="transaction-list" component={TransactionList} />
        <Stack.Screen name="transaction-detail" component={TransactionDetail} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
