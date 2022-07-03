/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import useColorScheme from '../hooks/useColorScheme';
import {
  BottomTabParamList,
  TabFourParamsList,
  TabOneParamList,
  TabTwoParamList,
} from '../types';
import {View, Text} from 'react-native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
import LabourDashboard from '../screens/Labour/Dashboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Profile from '../screens/Profile';
import ViewWork from '../screens/Labour/ViewWork';
import ApplySuccess from '../screens/Labour/ApplySuccess';
import Online from '../screens/Labour/Online';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LabourBottomTabNavigator({navigation}: any) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarLabelStyle: {
          color: 'white',
          marginTop: -10,
          marginBottom: 10,
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#203c54',
        },
      }}>
      <BottomTab.Screen
        name="Dashboard"
        component={TabOneLabourNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}: any) => {
            return focused ? (
              <MaterialIcons
                name="home-filled"
                size={24}
                color="white"
                onPress={() => {}}
              />
            ) : (
              <Icon name="home" size={24} color="white" onPress={() => {}} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({focused, color}: any) => {
            return focused ? (
              <FontAwesome
                name="user"
                size={24}
                color="white"
                onPress={() => {}}
              />
            ) : (
              <FontAwesome
                name="user-o"
                size={24}
                color="white"
                onPress={() => {}}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

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

const TabTwoStack = createStackNavigator<TabTwoParamList>();

const TabFourStack = createStackNavigator<TabFourParamsList>();

function TabFourNavigator({navigation}: any) {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Dashboard')}
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
                borderColor: 'white',
                marginLeft: 8,
                marginTop: 13,
              }}></TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: 'Profile',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
    </TabFourStack.Navigator>
  );
}
