import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Linking,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  JobIcon,
  BackArrowIcon,
  MoreIcon,
  LocationIcon,
  RightArrowIcon,
  CallFAQ,
  ChatFAQicon,
  ExperienceSuitcaseIcon,
  SalaryIcon,
} from '../../common/icons';
import Colors from '../../constants/Colors';
import ContractorApi from '../../services/Contractor.service';
import RazorpayCheckout from 'react-native-razorpay';
import Loader from '../../common/Loader';
import {useTranslation} from 'react-i18next';
import {ASSET_BASE_URL} from '../../URL';
// import Payumoney, {HashGenerator} from 'react-native-payumoney';

const ContractorObj = new ContractorApi();

const ViewLabour = ({navigation, route}: any) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isWork, setIsWork] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [labourData, setLabourData] = useState<any>();
  const [loader, setLoader] = useState(true);
  const jobInfo = route?.params?.jobInfo ? route.params.jobInfo : {};
  const sheetRef: any = React.useRef(null);
  const trialCount = route?.params?.trialCount;
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const getLabourInfo = async () => {
      const requestBody = {
        user_id: route.params.isJob ? route.params.userId : jobInfo?.unique_id,
      };
      const response = await ContractorObj.getLabourInfo(requestBody);

      if (response?.data?.data) {
        setLoader(false);
      }
      const {data} = response.data;
      setLabourData(data[0]);
    };
    getLabourInfo();
  }, []);

  const successCallback = (data: any) => {
    console.log(data);
  };
  const failureCallback = (data: any) => {
    console.log(data);
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <ScrollView>
        <View style={styles.DashboardMainContainer}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ContractorDashboard')}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.notification}>
            <MoreIcon />
          </View>
        </View>

        {loader ? (
          <Loader />
        ) : (
          <View>
            <View style={styles.ViewJobDetailsContainer}>
              <View>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                  }}
                  source={
                    jobInfo.profile_pic
                      ? {
                          uri: `https://assets.datahayinfotech.com/assets/storage/${jobInfo.profile_pic}`,
                        }
                      : {
                          uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/userIcon.png`,
                        }
                  }
                />
              </View>
              <View>
                <Text style={{fontSize: 18, fontWeight: '600', marginTop: 10}}>
                  {labourData?.full_name}
                </Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 12}}>
                <LocationIcon />
                <Text style={{marginLeft: 10}}>
                  {labourData?.city_name} , {labourData?.state_name}
                </Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 12}}>
                <ExperienceSuitcaseIcon />
                <Text style={{marginLeft: 10}}>
                  {labourData?.experience} {t('years')}
                </Text>
                <Text style={{marginLeft: 10}}>{labourData?.labour_type}</Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', marginTop: 12}}>
                <SalaryIcon />
                <Text style={{marginLeft: 10}}>
                  {labourData?.labour_price} RS.
                </Text>
              </View>
            </View>

            <ScrollView>
              <View style={styles.DashboadTabs}>
                <TouchableOpacity
                  onPress={() => setIsWork(false)}
                  style={
                    isWork === false
                      ? styles.hightLightTab
                      : styles.hightLightOffTab
                  }>
                  <View>
                    <Text
                      style={
                        isWork === false ? {color: 'white'} : {color: 'black'}
                      }>
                      {t('workerDetail')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {trialCount > 3 ? (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      {t('threeFreeTrialEnded')}
                    </Text>
                    <Text>{t('pleasePayToUnlockDetails')}</Text>
                  </View>
                  <ImageBackground
                    source={{
                      uri: `https://assets.datahayinfotech.com/assets/images/UserInfoBlur.png`,
                    }}
                    resizeMode="cover"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 310,
                      width: 310,
                      marginTop: 10,
                    }}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'cover',
                      }}
                      source={{
                        uri: `https://assets.datahayinfotech.com/assets/images/lock.png`,
                      }}
                    />
                  </ImageBackground>
                </View>
              ) : (
                <View
                  style={{
                    display: 'flex',
                    marginLeft: 30,
                    marginTop: 20,
                    borderRadius: 7,
                    marginRight: 30,
                    backfaceVisibility: 'hidden',
                    height: 350,
                  }}>
                  <View style={{marginTop: 20, marginLeft: 15}}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      {t('workerDetail')}
                    </Text>
                  </View>
                  <View style={{marginTop: 20, marginLeft: 15}}>
                    <Text>
                      {t('industry')}: {labourData?.industry}
                    </Text>
                  </View>
                  <View style={{marginTop: 20, marginLeft: 15}}>
                    <Text>
                      {t('experience')}: {labourData?.experience}+ {t('years')}
                    </Text>
                  </View>
                  <View style={{marginTop: 20, marginLeft: 15}}>
                    <Text>
                      {t('area')}: {labourData?.locality} ,{' '}
                      {labourData?.city_name}
                    </Text>
                  </View>
                  <View style={{marginTop: 20, marginLeft: 15}}>
                    <Text>
                      {t('phoneNo')}: {labourData?.mobile}
                    </Text>
                  </View>
                  <View style={styles.ProfileSection}>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(
                          `sms:${labourData.mobile}`,
                        );
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
                          <Text> {t('chatWithKarigat')}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(
                          `sms:&addresses=9687347050&body=My sms text`,
                        );
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginLeft: 20,
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
                          number = `telprompt:${labourData.mobile}`;
                        } else {
                          number = `tel:${labourData.mobile}`;
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
                          <Text>{t('talkWithKarigar')}</Text>
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
                          marginLeft: 20,
                        }}>
                        <RightArrowIcon />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {trialCount > 3 && (
                <TouchableOpacity
                  onPress={async () => {
                    // let hash = HashGenerator({
                    //   key: 'fOWDDu',
                    //   amount: '1.0',
                    //   email: 'xyz@gmail.com',
                    //   txnId: '1594976828726',
                    //   productName: 'product_info',
                    //   firstName: 'firstname',
                    //   salt: 'LTLBCwwkBuWBk9pAuuIIvF2FJ2SvyBds',
                    // });
                    // const payData = {
                    //   amount: '10.0',
                    //   txnId: '1594976828726',
                    //   productName: 'product_info',
                    //   firstName: 'firstname',
                    //   email: 'xyz@gmail.com',
                    //   phone: '9639999999',
                    //   merchantId: '8510805',
                    //   key: 'fOWDDu',
                    //   successUrl:
                    //     'https://www.payumoney.com/mobileapp/payumoney/success.php',
                    //   failedUrl:
                    //     'https://www.payumoney.com/mobileapp/payumoney/failure.php',
                    //   isDebug: true,
                    //   hash: hash,
                    // };
                    // Payumoney(payData)
                    //   .then((data: any) => {
                    //
                    //     // Payment Success
                    //     console.log(data);
                    //   })
                    //   .catch((e: any) => {
                    //
                    //     // Payment Failed
                    //     console.log(e);
                    //   });

                    // RNUpiPayment.initializePayment(
                    //   {
                    //     vpa: '9879572927@paytm', // or can be john@ybl or mobileNo@upi
                    //     payeeName: 'Kuldeep',
                    //     amount: '1',
                    //     transactionRef: 'aasf-332-aoei-fn1',
                    //   },
                    //   successCallback,
                    //   failureCallback,
                    // );

                    var options = {
                      description: 'Credits towards consultation',
                      image: 'https://i.imgur.com/3g7nmJC.png',
                      currency: 'INR',
                      key: 'rzp_test_1cCs05GTChSvvz',
                      amount: '100',
                      name: 'Karigar Babu',
                      prefill: {
                        email: '04amitpanchal@gmail.com',
                        contact: '9687347050',
                        name: 'Amit panchal',
                      },
                      theme: {color: '#203c54'},
                    };
                    await RazorpayCheckout.open(options)
                      .then((data: any) => {
                        console.log(data + 'data');

                        // handle success
                        // alert(`Success: ${data.razorpay_payment_id}`);
                      })
                      .catch((error: any) => {
                        console.log(error + 'error');

                        // handle failure
                        // alert(`Error: ${error.code} | ${error.description}`);
                      });
                    navigation.navigate('PaymentsSuccess');
                  }}
                  style={styles.sendOtpBtn}>
                  <View>
                    <Text style={styles.otpText}>{t('paymentButtonText')}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DashboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  ProfileSection: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 40,
  },
  hightLightTab: {
    width: '100%',
    height: 40,
    backgroundColor: '#1C3857',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  hightLightOffTab: {
    width: '50%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  DashboadTabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    borderRadius: 30,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(18, 18, 18, 0.1);',
    padding: 4,
  },
  experienceAndWage: {
    marginLeft: 30,
    marginTop: 10,
  },
  userCardContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.1);',
    marginLeft: 20,
    marginRight: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    borderRadius: 14,
  },
  descriptionTab: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(18, 18, 18, 0.3);',
    lineHeight: 21,
  },
  ViewJobDetailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  tabLineColor: {
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.1);',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  viewJobTabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  workCardContainer: {
    display: 'flex',
    borderWidth: 1,
    borderColor: 'rgba(18, 18, 18, 0.1)',
    height: 116,
    marginLeft: 20,
    width: '88%',
    borderRadius: 12,
    marginTop: 20,
  },
  workTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  noActiveJobText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noActiveJobsTextDetails: {
    fontSize: 24,
    fontWeight: '600',
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
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  otpText: {
    color: 'white',
  },
  notification: {
    marginRight: 40,
  },
  DashboardMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginLeft: 20,
  },
  AddWorkSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1a104c',
  },
  morningText: {
    fontWeight: '600',
    fontSize: 24,
    marginTop: 37,
    marginLeft: 15,
  },
  createJobTitle: {
    fontSize: 14,
    color: '#121212',
    marginLeft: 15,
  },
  // AddWorkText: {
  //     color: '#1a104c',
  //     fontSize: 20,
  //     fontWeight: '600'
  // },
  curvedBox: {
    height: 80,
    width: wp('100%'),
    backgroundColor: '#1a104c',
    borderRadius: 20,
    marginTop: -30,
  },
  SquareBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
    shadowColor: Colors.mainBlueColor.color,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    marginBottom: 7,
    elevation: 2,
  },
  SecountRowSquareBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: Colors.mainBlueColor.color,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    elevation: 2,
    marginVertical: 2,
  },
  AddWorkBox: {
    height: 160,
    width: 140,
    backgroundColor: '#1a104c',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectLabour: {
    height: 160,
    width: 140,
    backgroundColor: '#1a104c',
    borderRadius: 10,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ActionText: {
    fontSize: 18,
    marginTop: 40,
    marginLeft: 20,
    fontWeight: '700',
    color: '#1a104c',
  },
  AddWorkText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  SelectLabourText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ViewLabour;
