import React, {useState} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackArrowIcon,
  RightArrowIcon,
  Profile as ProfilePicture,
  ChatFAQicon,
  CallFAQ,
} from '../common/icons';

const FAQ = ({navigation}: any) => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.DashboardMainContainer}>
        <View style={{width: '35%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <BackArrowIcon />
          </TouchableOpacity>
        </View>
        <View style={{width: '60%'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Help Center</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 20,
            marginTop: 33,
          }}>
          FAQ and support
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: 'rgba(18, 18, 18, 0.45);',
            paddingLeft: 20,
            marginTop: 8,
          }}>
          Didn’t find the answer you were looking for?
        </Text>
        <Text
          style={{
            color: 'rgba(18, 18, 18, 0.45);',
            paddingLeft: 20,
            marginTop: 2,
          }}>
          Contact our support center.
        </Text>
      </View>

      <View style={styles.ProfileSection}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`sms:&addresses=9687347050&body=My sms text`);
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <ChatFAQicon />
            </View>
            <View style={{marginLeft: 20}}>
              <Text>Chat with us</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`sms:&addresses=9687347050&body=My sms text`);
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <RightArrowIcon />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.ProfileSection}>
        <TouchableOpacity
          onPress={() => {
            let number = '';
            if (Platform.OS === 'ios') {
              number = 'telprompt:${091123456789}';
            } else {
              number = 'tel:${091123456789}';
            }
            Linking.openURL(number);
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <CallFAQ />
            </View>

            <View style={{marginLeft: 20}}>
              <Text>Contact us via call</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let number = '';
            if (Platform.OS === 'ios') {
              number = 'telprompt:${9687347050}';
            } else {
              number = 'tel:${9687347050}';
            }
            Linking.openURL(number);
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <RightArrowIcon />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          marginTop: 20,
          width: '100%',
          borderColor: '1px solid rgba(0, 0, 0, 0.1);',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  DashboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  sendOtpBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    backgroundColor: '#FEA700',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  ProfileSection: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 40,
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

export default FAQ;
