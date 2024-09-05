import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import Routes from './routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
      <Routes />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
