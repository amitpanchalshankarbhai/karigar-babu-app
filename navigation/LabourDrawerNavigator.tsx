import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import LabourBottomTabNavigator from './LabourBottomTabNavigator';

const LabourDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        options={{headerShown: false}}
        name="Home"
        component={LabourBottomTabNavigator}
      />
    </Drawer.Navigator>
  );
};

export default LabourDrawerNavigator;
