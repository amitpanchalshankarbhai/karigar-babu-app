import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoginApi from '../services/login.service';
import {ScrollView} from 'react-native';
import {ShapeIcon} from '../common/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ASSET_BASE_URL} from '../URL';
import LoaderImage from '../assets/loader.gif';
const loginIn = new LoginApi();

const OTP = ({navigation, route}: any) => {
  let {otp} = route.params;
  let {mobile} = route.params;
  const firstNumberRef = useRef<any>(null);
  const secoundNumberRef = useRef<any>(null);
  const thirdNumberRef = useRef<any>(null);
  const forthNumberRef = useRef<any>(null);

  const [firstNumber, setfirstNumber] = useState(otp.toString().charAt(0));
  const [secoundNumber, setSecoundNumber] = useState(otp.toString().charAt(1));
  const [thirdNumber, setThirdNumber] = useState(otp.toString().charAt(2));
  const [forthNumber, setForthNumber] = useState(otp.toString().charAt(3));
  const [showLoader, setShowLoader] = useState(false);
  const {t, i18n} = useTranslation();
  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('userId', value.toString());
      navigation.navigate('UserType');
    } catch (e) {
      console.log('Can not store auth token');
    }
  };
  const onOtpVerify = async () => {
    setShowLoader(true);
    let res: any = await loginIn.verifyOtp({otp: route.params.otp, mobile});
    setShowLoader(false);
    if (res) {
      await storeData(res.data.data.user_id);
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <ScrollView>
          <View style={styles.LoginContainer}>
            <View style={styles.firstPortion}>
              <View style={styles.karigarLogoContainer}>
                <ShapeIcon />
                <Image
                  style={styles.karigarLogo}
                  source={{
                    uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/contactor-removebg-preview.webp`,
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
              <View style={styles.otpAnimationContainer}>
                <Image
                  style={{
                    width: 90,
                    height: 90,
                    marginLeft: 10,
                    marginTop: 20,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/76041-enter-otp.gif`,
                  }}
                />
              </View>
              <View>
                <Text style={styles.enterOtpText}> {t('enterOtp')}</Text>
              </View>
              <View style={styles.otpTitle}>
                <Text style={styles.loginFieldDesc}>
                  {t('fourDigit')} <Text>+91 8254635988</Text>
                </Text>
              </View>
              <View style={styles.otpInputContainer}>
                <TextInput
                  ref={firstNumberRef}
                  selectionColor={'#FEA700'}
                  style={styles.otpInput}
                  keyboardType={'number-pad'}
                  value={firstNumber}
                  maxLength={1}
                  onChange={(value: any) => {
                    setfirstNumber(value);
                    if (value !== '') {
                      secoundNumberRef.current.focus();
                    }
                  }}></TextInput>
                <TextInput
                  ref={secoundNumberRef}
                  selectionColor={'#FEA700'}
                  style={styles.otpInput}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  value={secoundNumber}
                  onChange={(value: any) => {
                    setSecoundNumber(value);
                    if (value !== '') {
                      thirdNumberRef.current.focus();
                    } else {
                      firstNumberRef.current.focus();
                    }
                  }}></TextInput>
                <TextInput
                  ref={thirdNumberRef}
                  selectionColor={'#FEA700'}
                  style={styles.otpInput}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  value={thirdNumber}
                  onChange={(value: any) => {
                    setForthNumber(value);
                    if (value !== '') {
                      forthNumberRef.current.focus();
                    } else {
                      secoundNumberRef.current.focus();
                    }
                  }}></TextInput>
                <TextInput
                  ref={forthNumberRef}
                  selectionColor={'#FEA700'}
                  style={styles.otpInput}
                  value={forthNumber}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  onChange={(value: any) => {
                    setForthNumber(value);
                    if (value !== '') {
                      forthNumberRef.current.focus();
                    } else {
                      thirdNumberRef.current.focus();
                    }
                  }}
                  // onTouchCancel={}
                ></TextInput>
              </View>
              {/* <View style={styles.otpSecondsContianer}>
            <Text style={styles.loginFieldDesc}>
              Resend code in <Text style={styles.seconds}> 00: 50</Text>
            </Text>
          </View> */}
              <TouchableOpacity
                onPress={() => {
                  onOtpVerify();
                }}
                style={styles.sendOtpBtn}>
                <View>
                  <Text style={styles.otpText}>{t('submit')}</Text>
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
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                  }}
                  source={LoaderImage}
                />
              </View>}
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
    backgroundColor: '#1c3857',
  },
  otpAnimationContainer: {
    marginTop: 13,
  },
  otpInputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  otpSecondsContianer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seconds: {
    color: '#4971ff',
  },
  otpInput: {
    width: '18%',
    height: 40,
    marginLeft: 15,
    borderBottomWidth: 1.5,
    borderColor: '#FEA700',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 5,
  },
  firstPortion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: -140,
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
  enterOtpText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    marginTop: 15,
    marginLeft: 15,
  },
  otpTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    // height: 200,
    marginTop: 100,
  },
  starterHeaderDescContainer: {
    height: 200,
  },
  starterDescHeader: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.65)',
  },
  loginFieldContainer: {
    height: 380,
    width: 314,
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: hp('50%'),
  },
  loginFirstFieldHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 15,
    marginTop: 28,
  },
  loginSecFieldHeader: {
    fontSize: 24,
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
    // boxShadow: '0 21 14 -10 rgba(228, 151, 4, 0.2)',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
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

export default OTP;
