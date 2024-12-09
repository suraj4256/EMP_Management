/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import StackNavigator from './src/navigation/StackNavigator';


function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
      <StackNavigator />
  );
}

const styles = StyleSheet.create({});

export default App;
