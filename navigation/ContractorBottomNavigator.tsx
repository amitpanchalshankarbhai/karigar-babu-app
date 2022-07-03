/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/Contractor/Dashboard';
import {
  BottomTabParamList,
  TabFourParamsList,
  TabOneParamList,
  TabThreeParamsList,
  TabTwoParamList,
} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import AddWork from '../screens/Contractor/AddWork';
import Profile from '../screens/Profile';
import ViewJobs from '../screens/Contractor/ViewJob';
import ViewLabour from '../screens/Contractor/ViewLabour';
import Payments from '../screens/Contractor/Payment';
import PaymentsSuccess from '../screens/Contractor/PaymentSuccess';
import FAQ from '../screens/FAQ';
import Login from '../screens/Login';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function ContractorBottomTabNavigator({navigation}: any) {
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
        component={TabOneContractorNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
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
        name="Notification"
        component={TabThreeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            return focused ? (
              <MaterialIcons
                name="notifications"
                size={26}
                color="white"
                onPress={() => {}}
              />
            ) : (
              <MaterialIcons
                name="notifications-none"
                size={26}
                color="white"
                onPress={() => {}}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={TabFourNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
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

const TabTwoStack = createStackNavigator<TabTwoParamList>();

const TabThreeStack = createStackNavigator<TabThreeParamsList>();

function TabThreeNavigator({navigation}: any) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Notification"
        component={Login}
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
              }}>
              {/* <Image source={require('../assets/images/karigar_logo.jpeg')} style={{ height: 40, width: 40, borderRadius: 30, display:'flex',justifyContent:'center',alignItems:'center' }} />  */}
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: 'Notification',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#1a104c',
          },
        }}
      />
    </TabThreeStack.Navigator>
  );
}

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
              }}>
              {/* <Image source={require('../assets/images/karigar_logo.jpeg')} style={{ height: 40, width: 40, borderRadius: 30, display:'flex',justifyContent:'center',alignItems:'center' }} />  */}
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerShown: false,
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
