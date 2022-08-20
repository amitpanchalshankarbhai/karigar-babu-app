/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {
  TabTwoParamList,
} from '../types';
import {View} from 'react-native';
import LabourDashboard from '../screens/Labour/Dashboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ViewWork from '../screens/Labour/ViewWork';
import ApplySuccess from '../screens/Labour/ApplySuccess';
import Online from '../screens/Labour/Online';

const TabTwoStack = createStackNavigator<TabTwoParamList>();

export function TabOneLabourNavigator({navigation}: any) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Online"
        component={Online}
        options={{
          headerShown: false,
          headerTitle: 'Add skill',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
          headerRight: () => (
            <View>
              <Ionicons
                style={{marginRight: 10}}
                name="notifications"
                size={24}
                color="white"
              />
            </View>
          ),
        }}
      />
      <TabTwoStack.Screen
        name="LabourDashboard"
        component={LabourDashboard}
        options={{
          headerShown: false,
          headerTitle: 'Dashboard',
          headerTitleStyle: {marginTop: -10},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
                borderColor: 'white',
                marginLeft: 8,
              }}></TouchableOpacity>
          ),
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
          headerRight: () => (
            <View>
              <Ionicons
                style={{marginRight: 10}}
                name="notifications"
                size={24}
                color="white"
              />
            </View>
          ),
        }}
      />
      <TabTwoStack.Screen
        name="ViewWork"
        component={ViewWork}
        options={{
          headerShown: false,
          headerTitle: 'Add skill',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
          headerRight: () => (
            <View>
              <Ionicons
                style={{marginRight: 10}}
                name="notifications"
                size={24}
                color="white"
              />
            </View>
          ),
        }}
      />
      <TabTwoStack.Screen
        name="ApplySuccess"
        component={ApplySuccess}
        options={{
          headerShown: false,
          headerTitle: 'Add skill',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
          headerRight: () => (
            <View>
              <Ionicons
                style={{marginRight: 10}}
                name="notifications"
                size={24}
                color="white"
              />
            </View>
          ),
        }}
      />
    </TabTwoStack.Navigator>
  );
}