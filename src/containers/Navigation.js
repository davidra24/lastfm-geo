import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Main} from '../screens/Main';
import { DetailGeo } from '../screens/DetailGeo';

const {Navigator, Screen} = createStackNavigator();

export const StackNavigation = () => {
  return (
    <Navigator>
      <Screen name="geo" component={Main} options={{headerShown: false}}></Screen>
      <Screen name="detail" component={DetailGeo} options={{headerShown: false}}></Screen>
    </Navigator>
  );
};
