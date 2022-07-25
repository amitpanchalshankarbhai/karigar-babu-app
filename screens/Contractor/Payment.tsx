import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BackArrowIcon} from '../../common/icons';
import RazorpayCheckout from 'react-native-razorpay';

const Payments = ({navigation}: any) => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.DashboardMainContainer}>
        <View style={{width: '35%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ViewLabour')}>
            <BackArrowIcon />
          </TouchableOpacity>
        </View>
        <View style={{width: '60%'}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Payments</Text>
        </View>
      </View>
      <View style={styles.paymentPaybleTextContainer}>
        <View>
          <Text>Total Amount</Text>
        </View>
        <View>
          <Text style={{fontWeight: '700'}}>RS. 10</Text>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={async () => {
            var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'INR',
              key: 'rzp_test_9cOffhD2rJwTSF',
              amount: '1000',
              name: 'Karigar Babu',
              prefill: {
                email: '',
                contact: '9191919191',
                name: 'Gaurav Kumar',
              },
              theme: {color: '#FEA700'},
            };
            await RazorpayCheckout.open(options)
              .then((data: any) => {
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch((error: any) => {
                // handle failure
                // alert(`Error: ${error.code} | ${error.description}`);
              });
            // navigation.navigate('PaymentsSuccess');
          }}
          style={styles.sendOtpBtn}>
          <View>
            <Text style={styles.otpText}>Pay Now</Text>
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
  otpText: {
    color: 'white',
  },
  paymentPaybleTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '10%',
    borderRadius: 8,
    backgroundColor: 'rgba(18, 18, 18, 0.1);',
    height: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  DashboardMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 50,
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

export default Payments;
