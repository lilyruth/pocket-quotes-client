import { StatusBar } from 'expo-status-bar';
import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import MainComponent from './components/MainComponent';
import { useFonts, LovedbytheKing_400Regular } from '@expo-google-fonts/loved-by-the-king';
import {
  BalsamiqSans_400Regular
 } from '@expo-google-fonts/balsamiq-sans';
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading';

LogBox.ignoreAllLogs()

export default function App(props) {

  let [fontsLoaded] = useFonts({
    LovedbytheKing_400Regular, BalsamiqSans_400Regular
  });

   if (!fontsLoaded) {
     return <AppLoading />;
   } else {
  return (
    <Provider store={store}>
    <MainComponent />
    </Provider>
  );
  }

}
