import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {BackArrowIcon} from '../../common/icons';
import {useTranslation} from 'react-i18next';
import {ASSET_BASE_URL} from '../../URL';
const PaymentsSuccess = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  return (
    <View style={{backgroundColor: '#ffffff', height: '100%'}}>
      <View style={styles.DashboardMainContainer}>
        <View style={{width: '35%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ViewLabour')}>
            <BackArrowIcon />
          </TouchableOpacity>
        </View>
        <View style={{width: '60%'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{t('payment')}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Image
          style={{
            width: 200,
            height: 200,
            marginLeft: 10,
            resizeMode: 'cover',
          }}
          source={{
            uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/gifs/success.gif`,
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>
          {t('paymentSuccessfull')}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: 'rgba(18, 18, 18, 0.65);', marginTop: 5}}>
          {t('thankYouForPayment')}
        </Text>
        <Text style={{color: 'rgba(18, 18, 18, 0.65);', marginTop: 5}}>
          {t('yourLabourBooked')}
        </Text>
        <Text style={{color: 'rgba(18, 18, 18, 0.65);', marginTop: 5}}>
          {t('viewLabourByclickingBelowButton')}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewLabour')}
          style={styles.sendOtpBtn}>
          <View>
            <Text style={styles.otpText}>{t('viewWorker')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DashboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  sendOtpBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#FEA700',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: '10%',
    marginRight: 15,
    marginLeft: 15,
  },
  otpText: {
    color: 'white',
  },
  paymentPaybleTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(18, 18, 18, 0.1);',
    height: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  DashboardMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 60,
    marginLeft: 20,
  },
  paymentMehtodTypeContainer: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 6,
  },
});

export default PaymentsSuccess;
