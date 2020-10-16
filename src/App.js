/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { StackNavigation } from './containers/Navigation';
import { Provider } from "react-redux";
import store from "./redux/reducer";

const App = () => (
  <>
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation></StackNavigation>
      </NavigationContainer>
    </Provider>
  </>
);


export default App;
