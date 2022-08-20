/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/Contractor/Dashboard';
import {
  TabOneParamList,
} from '../types';
import AddWork from '../screens/Contractor/AddWork';
import ViewJobs from '../screens/Contractor/ViewJob';
import ViewLabour from '../screens/Contractor/ViewLabour';
import Payments from '../screens/Contractor/Payment';
import PaymentsSuccess from '../screens/Contractor/PaymentSuccess';
import FAQ from '../screens/FAQ';

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

export function TabOneContractorNavigator({navigation}: any) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="ContractorDashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          headerTitle: 'Dashboard',
          headerTitleStyle: {marginTop: -10},
          headerLeft: () => null,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
      <TabOneStack.Screen
        name="AddWork"
        component={AddWork}
        options={{
          headerShown: false,
          headerTitle: 'Add Work',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
      <TabOneStack.Screen
        name="ViewLabour"
        component={ViewLabour}
        options={{
          headerShown: false,
          headerTitle: 'Add Work',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
      <TabOneStack.Screen
        name="PaymentsSuccess"
        component={PaymentsSuccess}
        options={{
          headerShown: false,
          headerTitle: 'Add Work',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
      <TabOneStack.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerShown: false,
          headerTitle: 'Add Work',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />

      <TabOneStack.Screen
        name="Payments"
        component={Payments}
        options={{
          headerShown: false,
          headerTitle: 'Add Work',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
      <TabOneStack.Screen
        name="ViewJob"
        component={ViewJobs}
        options={{
          headerShown: false,
          headerTitle: 'Add Work',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
    </TabOneStack.Navigator>
  );
}