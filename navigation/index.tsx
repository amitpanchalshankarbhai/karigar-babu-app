/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName, View} from 'react-native';
import AddWork from '../screens/Contractor/AddWork';
import Login from '../screens/Login';

import OTP from '../screens/OTP';
import UserType from '../screens/UserType';
import {RootStackParamList} from '../types';
import BottomTabNavigator, {
  TabOneLabourNavigator,
} from './LabourBottomTabNavigator';
import ContractorDrawerNavigator from './ContractorDrawerNavigator';
import DrawerNavigator from './ContractorDrawerNavigator';
import LabourDrawerNavigator from './LabourDrawerNavigator';
// import LinkingConfiguration from './LinkingConfiguration';
import '../common/axios.config';
import SignupContractor from '../screens/SignupContractor';
import SignupLabour from '../screens/SignupLabour';
import OnboardingOne from '../screens/OnBording/OnboardingOne';
import OnboardingTwo from '../screens/OnBording/OnboardingTwo';
import Language from '../screens/Lanuguage';
import {TabOneContractorNavigator} from './ContractorBottomNavigator';
import SignupContractorAddress from '../screens/SignupContractorAddress';
import SignupLabourAddress from '../screens/SignupLabourAddress';
import {getStoreValue} from '../common/LocalStorage';
import Dashboard from '../screens/Contractor/Dashboard';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import WorkHistoty from '../screens/WorkHistoty';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [token, setToken] = React.useState<any>('');
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    const getToken = async () => {
      const token = await getStoreValue('token');
      let userInfo: any = await getStoreValue('userInfo');
      userInfo = JSON.parse(userInfo);
      setUserInfo(userInfo);
      setToken(token);
    };
    getToken();
  }, []);

  const horizontalAnimation = {
    cardStyleInterpolator: ({current, layouts}: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {token && userInfo ? (
        <>
          <Stack.Screen
            options={horizontalAnimation}
            name="ContractorDashboard"
            component={Dashboard}
          />
          <Stack.Screen
            name="Contractor"
            options={horizontalAnimation}
            component={TabOneContractorNavigator}
          />
          <Stack.Screen
            name="Profile"
            options={horizontalAnimation}
            component={Profile}
          />
          <Stack.Screen
            name="EditProfile"
            options={horizontalAnimation}
            component={EditProfile}
          />
          <Stack.Screen
            options={horizontalAnimation}
            name="Otp"
            component={OTP}
          />
          <Stack.Screen
            name="UserType"
            options={horizontalAnimation}
            component={UserType}
          />
          <Stack.Screen
            name="signupContractor"
            options={horizontalAnimation}
            component={SignupContractor}
          />
          <Stack.Screen
            name="signupContractorAddress"
            options={horizontalAnimation}
            component={SignupContractorAddress}
          />
          <Stack.Screen
            name="signupLabour"
            options={horizontalAnimation}
            component={SignupLabour}
          />
          <Stack.Screen
            name="signupLabourAddress"
            options={horizontalAnimation}
            component={SignupLabourAddress}
          />
          <Stack.Screen
            name="Labour"
            options={horizontalAnimation}
            component={TabOneLabourNavigator}
          />
          <Stack.Screen
            name="Root"
            options={horizontalAnimation}
            component={DrawerNavigator}
          />
          <Stack.Screen
            name="AddWork"
            options={horizontalAnimation}
            component={AddWork}
          />
          <Stack.Screen
            name="Login"
            options={horizontalAnimation}
            component={Login}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Language"
            options={horizontalAnimation}
            component={Language}
          />
          <Stack.Screen
            name="OnboardingOne"
            options={horizontalAnimation}
            component={OnboardingOne}
          />
          <Stack.Screen
            name="OnboardingTwo"
            options={horizontalAnimation}
            component={OnboardingTwo}
          />
          <Stack.Screen
            name="Login"
            options={horizontalAnimation}
            component={Login}
          />
          <Stack.Screen
            name="WorkHistory"
            options={horizontalAnimation}
            component={WorkHistoty}
          />
          <Stack.Screen
            options={horizontalAnimation}
            name="Otp"
            component={OTP}
          />
          <Stack.Screen
            name="UserType"
            options={horizontalAnimation}
            component={UserType}
          />
          <Stack.Screen
            name="signupContractor"
            options={horizontalAnimation}
            component={SignupContractor}
          />
          <Stack.Screen
            name="signupContractorAddress"
            options={horizontalAnimation}
            component={SignupContractorAddress}
          />
          <Stack.Screen
            name="signupLabour"
            options={horizontalAnimation}
            component={SignupLabour}
          />
          <Stack.Screen
            name="signupLabourAddress"
            options={horizontalAnimation}
            component={SignupLabourAddress}
          />
          <Stack.Screen
            name="ContractorDashboard"
            options={horizontalAnimation}
            component={Dashboard}
          />
          <Stack.Screen
            name="Contractor"
            options={horizontalAnimation}
            component={TabOneContractorNavigator}
          />
          <Stack.Screen
            name="Profile"
            options={horizontalAnimation}
            component={Profile}
          />
          <Stack.Screen
            name="EditProfile"
            options={horizontalAnimation}
            component={EditProfile}
          />

          <Stack.Screen
            name="Labour"
            options={horizontalAnimation}
            component={TabOneLabourNavigator}
          />
          <Stack.Screen
            name="Root"
            options={horizontalAnimation}
            component={DrawerNavigator}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
