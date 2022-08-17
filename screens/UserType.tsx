import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Labour, Contractor, TickMark } from '../common/icons';
import { ShapeIcon } from '../common/icons';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { setStoreValue } from '../common/LocalStorage';
import { ASSET_BASE_URL } from '../URL';

const UserType = ({ navigation }: any) => {
  const [showContractorHightLight, setshowContractorHightLight] =
    useState(false);
  const [accountSelected, setAccountSelected] = useState(false);
  const [showLabourHightLight, setshowLabourHightLight] = useState(false);
  const { t, i18n } = useTranslation();
  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <View style={styles.userTypeContainer}>
              <View
                style={
                  (styles.userTypeOne,
                    showContractorHightLight
                      ? {
                        borderWidth: 1,
                        borderColor: '#FEA700',
                        borderRadius: 14,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 150,
                        height: 150,
                        marginBottom: 20,
                        padding: 15,
                        backgroundColor: 'white',
                        elevation: 3,
                      }
                      : {
                        backgroundColor: 'white',
                        elevation: 3,
                        borderRadius: 15,
                        marginBottom: 20,
                        width: 150,
                        height: 150,
                        padding: 15,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      })
                }>
                <TouchableOpacity
                  onPress={() => {
                    setshowLabourHightLight(false);
                    setshowContractorHightLight(true);
                    setAccountSelected(false);
                    setStoreValue({
                      key: 'userType',
                      value: 'contractor',
                    });
                  }}>
                  {showContractorHightLight && <TickMark />}
                  <Contractor />
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.userTypeText}>{t('contractor')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={
                  (styles.userTypeTwo,
                    showLabourHightLight
                      ? {
                        borderWidth: 1,
                        borderColor: '#FEA700',
                        borderRadius: 14,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 150,
                        height: 150,
                        // marginBottom: 20,
                        padding: 15,
                        backgroundColor: 'white',
                        elevation: 3,
                      }
                      : {
                        backgroundColor: 'white',
                        borderRadius: 15,
                        elevation: 3,
                        // marginBottom: 20,
                        width: 150,
                        height: 150,
                        padding: 15,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      })
                }>
                <TouchableOpacity
                  onPress={() => {
                    setshowLabourHightLight(true);
                    setAccountSelected(false);
                    setshowContractorHightLight(false);
                    setStoreValue({
                      key: 'userType',
                      value: 'labour',
                    });
                  }}>
                  {showLabourHightLight && <TickMark />}
                  <Labour />
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.userTypeText}>{t('karigar')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginLeft: 20 , marginTop:10}}>
              {accountSelected && (
                <Text style={{ color: 'red' }}>
                  {t('selectWorkType')} {t('isRequired')}
                  {'*'}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (showContractorHightLight || showLabourHightLight) {
                  setAccountSelected(false);
                  if (showContractorHightLight) {
                    navigation.navigate('signupContractor');
                  } else {
                    navigation.navigate('signupLabour');
                  }
                } else {
                  setAccountSelected(true);
                }
              }}
              style={styles.sendOtpBtn}>
              <View>
                <Text style={styles.otpText}>{t('next')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  otpMainContainer: {
    marginTop: 100,
  },
  userType: {
    height: 140,
    width: 140,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTypeText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
  },
  userTypeOne: {
    height: 160,
    width: 160,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  userTypeTwo: {
    marginTop: 30,
    height: 160,
    width: 160,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  userTypeContainer: {
    height: hp('50%'),
    width: wp('50%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:hp('-2%'),
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
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
  },
  firstPortion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
    height: 500,
    width: 314,
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: hp('55%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop:30,
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

export default UserType;
