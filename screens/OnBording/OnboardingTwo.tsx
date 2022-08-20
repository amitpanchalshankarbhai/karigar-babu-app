import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {OnboardHightLightDot, NextBtn, NextBtnCircle} from '../../common/icons';
import {ASSET_BASE_URL} from '../../URL';

const OnboardingTwo = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#203c54',
            height: hp('110%'),
            width: '100%',
          }}>
          <Image
            style={{
              width: hp('65%'),
              height: hp('55%'),
              resizeMode: 'cover',
            }}
            source={{
              uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/LabourGroup.webp`,
            }}
          />
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginTop: 20,
              }}>
              {t('connectEasily')}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>
              {t('peersAndGetWork')}
            </Text>
            <View
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.65);',
                  fontSize: 13,
                }}>
                {t('useOurApp')}
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.65);',
                  fontSize: 13,
                }}>
                {t('withPeers')}
              </Text>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.65);',
                  fontSize: 13,
                }}>
                {t('forGetting')}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <OnboardHightLightDot />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
                marginLeft: 20,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginRight: 20,
                  marginTop: 10,
                }}>
                <NextBtn />
                <View style={{marginLeft: -35, marginTop: -6}}>
                  <NextBtnCircle />
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
    height: hp('100%'),
    backgroundColor: '#1c3857',
  },
});

export default OnboardingTwo;
