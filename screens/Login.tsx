import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoginApi from '../services/login.service';
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  ShapeIcon,
} from '../common/icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoreValue, setStoreValue } from '../common/LocalStorage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { Profile } from 'react-native-fbsdk-next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ASSET_BASE_URL } from '../URL';
import Loader from '../common/Loader';
const loginIn = new LoginApi();

const Login = ({ navigation }: any) => {
  const [phoneNo, setphoneNo] = useState<any>('');
  const { t, i18n } = useTranslation();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [facebookToken, setFacebookToken] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const storeData = async (value: any, userId: any) => {
    try {
      await AsyncStorage.setItem('token', value);
      await AsyncStorage.setItem('userId', userId.toString());
    } catch (e) {
      console.log('Can not store auth token');
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '368220512203-scrq9ra4f02gqohiuh0ch9cug5a6fko3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const onLogin = async () => {
    setShowLoader(true);
    let selectedLanguage = await getStoreValue('language');
    let requestBody: any = {
      mobile: Number(phoneNo),
      language: selectedLanguage,
    };
    await setStoreValue({ key: 'phoneNo', value: Number(phoneNo) });
    let res = await loginIn.checkUser(requestBody);
    setShowLoader(false);
    if (res?.data?.data?.userId) {
      storeData(res.data.data.token, res.data.data.userId);
      navigation.navigate('ContractorDashboard');
    } else {
      storeData(res.data.data.token, '');
      navigation.navigate('Otp', { otp: res.data.data.otp, mobile: phoneNo });
    }
  };

  useEffect(() => {
    const currentProfile = Profile.getCurrentProfile().then(function (
      currentProfile,
    ) {
      if (currentProfile) {
        console.log(
          'The current logged user is: ' +
          currentProfile.name +
          '. His profile id is: ' +
          currentProfile.userID,
        );
      }
    });
  }, [facebookToken]);

  const googleSign = async () => {
    await setStoreValue({
      key: 'socialLogin',
      value: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.navigate('Otp');
      // this.setState({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleFacebookLogin = async () => {
    await setStoreValue({
      key: 'socialLogin',
      value: true,
    });
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data: any) => {
            navigation.navigate('Otp');
            setFacebookToken(data.accessToken.toString());
            console.log(data.accessToken.toString());
          });
        }
      },
      function (error: any) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <ScrollView>
          <View style={styles.LoginContainer}>
            <View style={styles.firstPortion}>
              <View style={styles.karigarLogoContainer}>
                <ShapeIcon />
                <Image
                  style={styles.karigarLogo}
                  source={{
                    uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/contactor-removebg-preview.png`,
                  }}
                />
              </View>
              <View style={styles.starterHeaderContainer}>
                <Text style={styles.starterHeader}>{t('letSStart')}</Text>
              </View>
              <View style={styles.starterHeaderDescContainer}>
                <Text style={styles.starterDescHeader}>
                  {t('welcomeToAccount')}
                </Text>
              </View>
            </View>
            <View style={styles.loginFieldContainer}>
              <View>
                <Text style={styles.loginFirstFieldHeader}>
                  {t('enterMobileText')}
                </Text>
              </View>
              <View>
                <Text style={styles.loginFieldDesc}>{t('weSendAnOtp')}</Text>
              </View>
              <View>
                <Text style={styles.phoneNo}>{t('phoneNo')}</Text>
              </View>
              <View>
                <TextInput
                  // ref={}
                  selectionColor={'#FEA700'}
                  keyboardType={'number-pad'}
                  style={styles.phoneNoInput}
                  maxLength={10}
                  onSubmitEditing={() => {
                    if (phoneNo.length === 10) {
                      onLogin();
                    }
                  }}
                  onChangeText={(value: any) => {
                    setphoneNo(value);
                  }}></TextInput>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (phoneNo.length === 10) {
                    onLogin();
                  }
                }}
                style={
                  phoneNo.length < 10
                    ? styles.sendDisableOtpBtn
                    : styles.sendOtpBtn
                }>
                <View>
                  <Text style={styles.otpText}>{t('requestOtp')}</Text>
                </View>
              </TouchableOpacity>
              {showLoader && <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: 'http://assets.datahayinfotech.com/assets/images/loader.gif',
                  }}
                />
              </View>}
              {/* <View style={styles.loginButtonBorder}>
              <View style={styles.loginBottomFirstLine} />
              <Text style={styles.signUpText}>{t('signInWith')}</Text>
              <View style={styles.loginBottomSecLine} />
            </View> */}

              {/* <View style={styles.authContainer}>
              <View style={styles.googleBtn}>
                <TouchableOpacity
                  onPress={googleSign}
                  // accessToken ? getUserData : signInWithGoogleAsync
                  style={{display: 'flex', flexDirection: 'row'}}>
                  <GoogleIcon />
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text> Google</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.faceBookBtn}>
                <TouchableOpacity
                  onPress={handleFacebookLogin}
                  style={{display: 'flex', flexDirection: 'row'}}>
                  <FacebookIcon />
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text> Facebook</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('110%'),
    width: wp('100%'),
    backgroundColor: '#1c3857',
  },
  firstPortion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -120,
  },
  karigarLogoContainer: {
    height: hp('20%'),
    width: 100,
    marginTop: hp('30%'),
    marginLeft: '-80%',
    resizeMode: 'cover',
    display: 'flex',
    flexDirection: 'row',
  },
  karigarLogo: {
    height: 100,
    width: 100,
    marginLeft: wp('-40%'),
    marginTop: wp('30%'),
    resizeMode: 'contain',
  },
  starterHeader: {
    fontSize: 24,
    color: 'white',
  },
  starterHeaderContainer: {
    marginTop: 140,
  },
  starterHeaderDescContainer: {
    height: 200,
  },
  starterDescHeader: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.65)',
  },
  loginFieldContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 350,
    width: 314,
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: hp('50%'),
  },
  loginFirstFieldHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
  },
  loginSecFieldHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
  },
  loginFieldDesc: {
    fontSize: 14,
    color: '#121212',
    marginLeft: 15,
    marginTop: 10,
  },
  phoneNo: {
    fontSize: 12,
    color: 'rgba(18, 18, 18, 0.35)',
    marginTop: 50,
    marginLeft: 15,
  },
  phoneNoInput: {
    width: '90%',
    height: 40,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
  },
  sendOtpBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#FEA700',
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  sendDisableOtpBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#fce0a9',
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    opacity: 0.8,
  },
  otpText: {
    color: 'white',
  },
  loginBottomFirstLine: {
    marginTop: 4,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    width: '28%',
  },
  loginBottomSecLine: {
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    width: '28%',
  },
  loginButtonBorder: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 12,
    color: 'rgba(18, 18, 18, 0.35)',
  },

  googleBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 44,
    width: '45%',
    borderColor: 'rgba(18, 18, 18, 0.1)',
    borderRadius: 8,
  },
  faceBookBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 44,
    width: '45%',
    borderColor: 'rgba(18, 18, 18, 0.1)',
    borderRadius: 8,
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default Login;
