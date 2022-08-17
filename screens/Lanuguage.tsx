import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import '../common/i18n';
import { useTranslation } from 'react-i18next';
import { getStoreValue, setStoreValue } from '../common/LocalStorage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Language = ({ navigation }: any) => {
  const [radioEnabled, setRadioEnabled] = useState({
    Gujrati: false,
    Hindi: false,
    English: true,
  });
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState('English');

  const changeLanguage = (value: any) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const getUserData = async () => {
      const userType = await getStoreValue('userType');
      const phoneNo = await getStoreValue('phoneNo');
      const token = await getStoreValue('token');
      let userInfo: any = await getStoreValue('userInfo');
      userInfo = JSON.parse(userInfo);
      if (userType == 'labour' && phoneNo && token && userInfo?.full_name) {
        navigation.navigate('Labour');
      } else if (
        userType == 'contractor' &&
        phoneNo &&
        token &&
        userInfo?.full_name
      ) {
        navigation.navigate('Contractor');
      }
    };
    getUserData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ backgroundColor: 'white', height: hp('110%') }}>
          <View
            style={{
              marginTop: hp('4.5%'),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {t('language')}
            </Text>
          </View>

          <Image
            style={{
              width: wp('100%'),
              height: hp('35%'),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'cover',
            }}
            source={{
              uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/language.jpg`,
            }}
          />

          <View>
            <Text
              style={{
                fontWeight: '600',
                marginLeft: 20,
                marginTop: 10,
                fontSize: 20,
              }}>
              {t('selectLanugage')}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={async () => {
                changeLanguage('English');
                setRadioEnabled({
                  Gujrati: false,
                  Hindi: false,
                  English: true,
                });
                await setStoreValue({
                  key: 'language',
                  value: 'en',
                });
              }}>
              <View style={styles.paymentMehtodTypeContainer}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <View style={styles.languageContainer}>
                      <Text style={styles.languageText}>Eng</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 22,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>English</Text>
                  </View>
                </View>
                <View>
                  <RadioButton
                    value="first"
                    color="#1C3857"
                    status={radioEnabled.English ? 'checked' : 'unchecked'}
                    onPress={async () => {
                      changeLanguage('English');
                      setRadioEnabled({
                        Gujrati: false,
                        Hindi: false,
                        English: true,
                      });
                      await setStoreValue({
                        key: 'language',
                        value: 'en',
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onPress={async () => {
                setRadioEnabled({
                  Gujrati: true,
                  Hindi: false,
                  English: false,
                });
                changeLanguage('Gujrati');
                await setStoreValue({
                  key: 'language',
                  value: 'gu',
                });
              }}>
              <View style={styles.paymentMehtodTypeContainer}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <View style={styles.languageContainer}>
                      <Text style={styles.languageText}>Guj</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 22,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Gujrati</Text>
                  </View>
                </View>
                <View>
                  <RadioButton
                    value="first"
                    color="#1C3857"
                    status={radioEnabled.Gujrati ? 'checked' : 'unchecked'}
                    onPress={async () => {
                      changeLanguage('Gujrati');
                      setRadioEnabled({
                        Gujrati: true,
                        Hindi: false,
                        English: false,
                      });
                      await setStoreValue({
                        key: 'language',
                        value: 'gu',
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onPress={async () => {
                changeLanguage('Hindi');
                setRadioEnabled({
                  Gujrati: false,
                  Hindi: true,
                  English: false,
                });
                await setStoreValue({
                  key: 'language',
                  value: 'hi',
                });
              }}>
              <View style={styles.paymentMehtodTypeContainer}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}>
                    <View style={styles.languageContainer}>
                      <Text style={styles.languageText}>Hin</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 22,
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Hindi</Text>
                  </View>
                </View>
                <View>
                  <RadioButton
                    value="first"
                    color="#1C3857"
                    status={radioEnabled.Hindi ? 'checked' : 'unchecked'}
                    onPress={async () => {
                      changeLanguage('Hindi');
                      setRadioEnabled({
                        Gujrati: false,
                        Hindi: true,
                        English: false,
                      });
                      await setStoreValue({
                        key: 'language',
                        value: 'hi',
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('OnboardingOne')}
                style={styles.sendOtpBtn}>
                <View>
                  <Text style={styles.otpText}>{t('next')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#f4f5f7',
    borderRadius: 5,
  },
  languageText: {
    color: '#c7c8c9',
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
  otpText: {
    color: 'white',
  },
  paymentMehtodTypeContainer: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    marginBottom: 6,
  },
});

export default Language;
