import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import ContractorBottomTabNavigator from './ContractorBottomNavigator';

const ContractorDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={ContractorBottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default ContractorDrawerNavigator;
