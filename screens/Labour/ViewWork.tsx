import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
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
} from '../../common/icons';
import Colors from '../../constants/Colors';
import LabourApi from '../../services/Labour.service';
import {getStoreValue} from '../../common/LocalStorage';
import Failure from '../../common/components/Failure';
import {useTranslation} from 'react-i18next';
import {ASSET_BASE_URL} from '../../URL';
const LabourObj = new LabourApi();
const ViewWork = ({navigation, route}: any) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showContractorInfo, setshowContractorInfo] = useState(false);
  const [contractorDetails, setcontractorDetails] = useState<any>();
  const [showFailure, setShowFailure] = useState<any>(false);
  const [failureDescription, setFailureDescription] = useState<any>('');
  const [isEnabled, setIsEnabled] = useState(false);
  const {jobInfo} = route?.params;
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const getContractorDetails = async () => {
      const requestBody = {
        job_id: jobInfo?.job_id,
      };
      let response: any = await LabourObj.getContractorDetails(requestBody);

      setcontractorDetails(response?.data?.data[0]);
    };
    getContractorDetails();
  }, []);

  const applyJob = async () => {
    const requestBody = {
      job_id: jobInfo?.job_id,
      user_id: await getStoreValue('userId'),
      status: 1,
    };
    let response: any = await LabourObj.applyJob(requestBody);

    if (response.data.status === 200) {
      navigation.navigate('ApplySuccess');
    } else if (response.data.status === 500) {
      setShowFailure(true);
      setFailureDescription(response.data.message);
    }
  };

  const becomeOnline = async () => {
    const requestBody = {
      user_id: await getStoreValue('userId'),
      status: isEnabled ? 0 : 1,
    };
    let response: any = await LabourObj.becomeOnline(requestBody);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
          position: 'relative',
        }}>
        <View
          style={
            showFailure
              ? {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1,
                }
              : {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
          }>
          {showFailure && (
            <Failure
              failureDescription={failureDescription}
              onCancel={() => {
                setShowFailure(false);
              }}
            />
          )}
        </View>

        <View style={styles.DashboardMainContainer}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('LabourDashboard')}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.notification}>
              <MoreIcon />
            </View>
          </View>
        </View>

        <ScrollView style={{width: '100%', height: '100%'}}>
          {!showContractorInfo ? (
            <View>
              <ScrollView>
                <View style={styles.ViewJobDetailsContainer}>
                  <View>
                    <JobIcon />
                  </View>
                  <View>
                    <Text
                      style={{fontSize: 18, fontWeight: '600', marginTop: 10}}>
                      {jobInfo?.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 12,
                    }}>
                    <LocationIcon />
                    <Text style={{marginLeft: 10}}>
                      {jobInfo?.city},{jobInfo?.state}
                    </Text>
                  </View>
                </View>

                <View style={styles.DashboadTabs}>
                  <TouchableOpacity
                    onPress={() => setshowContractorInfo(false)}
                    style={
                      showContractorInfo === false
                        ? styles.hightLightTab
                        : styles.hightLightOffTab
                    }>
                    <View>
                      <Text
                        style={
                          showContractorInfo === false
                            ? {color: 'white'}
                            : {color: 'black'}
                        }>
                        {t('description')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setshowContractorInfo(true)}
                    style={styles.hightLightOffTab}>
                    <View>
                      <Text
                        style={
                          showContractorInfo !== false
                            ? {color: 'white'}
                            : {color: 'black'}
                        }>
                        {t('contractorDetails')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    display: 'flex',
                    marginLeft: 30,
                    marginTop: 20,
                    borderRadius: 7,
                    marginRight: 30,
                    shadowOpacity: 0.1,
                    backgroundColor: 'rgba(0, 0, 0, 0.1);',
                    backfaceVisibility: 'hidden',
                    height: 350,
                  }}>
                  <View style={{marginTop: 20, marginLeft: 15}}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>
                      {t('requirement')}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 15,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text style={{marginLeft: 10}}>{'\u2022'}</Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        width: '90%',
                        color: 'rgba(18, 18, 18, 0.65);',
                      }}>
                      {t('industry')}: {jobInfo?.type}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 15,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text style={{marginLeft: 10}}>{'\u2022'}</Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        width: '90%',
                        color: 'rgba(18, 18, 18, 0.65);',
                      }}>
                      {t('experience')}: {jobInfo?.experience_required} Years
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 15,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text style={{marginLeft: 10}}>{'\u2022'}</Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        width: '80%',
                        lineHeight: 23,
                        color: 'rgba(18, 18, 18, 0.65);',
                      }}>
                      {t('description')}: {jobInfo?.description}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginLeft: 30,
                    marginTop: 20,
                    borderRadius: 7,
                    marginRight: 30,
                    shadowOpacity: 0.1,
                    backgroundColor: 'rgba(0, 0, 0, 0.1);',
                    backfaceVisibility: 'hidden',
                    height: 70,
                  }}>
                  <View style={{marginLeft: 15}}>
                    <Text style={{fontWeight: '700', fontSize: 16}}>
                      {t('benefit')}
                    </Text>
                  </View>
                  <View style={{marginLeft: 15}}>
                    <Text>
                      {t('workPrice')}: {jobInfo?.price}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    applyJob();
                  }}
                  style={styles.sendOtpBtn}>
                  <View>
                    <Text style={styles.otpText}>{t('applyNow')}</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <View>
              <View style={styles.ViewJobDetailsContainer}>
                <View>
                  <JobIcon />
                </View>
                <View>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', marginTop: 10}}>
                    {jobInfo?.title}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 12,
                  }}>
                  <LocationIcon />
                  <Text style={{marginLeft: 10}}>
                    {jobInfo.city},{jobInfo.state}
                  </Text>
                </View>
              </View>

              <View style={styles.DashboadTabs}>
                <TouchableOpacity
                  onPress={() => setshowContractorInfo(false)}
                  style={styles.hightLightOffTab}>
                  <View>
                    <Text style={{color: 'black'}}>{t('description')}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setshowContractorInfo(true)}
                  style={
                    showContractorInfo === true
                      ? styles.hightLightTab
                      : styles.hightLightOffTab
                  }>
                  <View>
                    <Text style={{color: 'white'}}>
                      {t('contractorDetails')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: 'flex',
                  marginLeft: 30,
                  marginTop: 20,
                  borderRadius: 7,
                  marginRight: 30,
                  shadowOpacity: 0.1,
                  backgroundColor: 'rgba(0, 0, 0, 0.1);',
                  backfaceVisibility: 'hidden',
                  height: 350,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 35,
                    }}
                    source={{
                      uri: `https://assets.datahayinfotech.com/assets/storage${contractorDetails.profile_pic}`,
                    }}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: '600'}}>
                    {contractorDetails?.full_name}
                  </Text>
                </View>
                <View style={{marginTop: 20, marginLeft: 15}}>
                  <Text style={{fontSize: 14, fontWeight: '700'}}>
                    {t('phoneNo')}
                  </Text>
                </View>
                <View style={{marginTop: 10, marginLeft: 35}}>
                  <Text style={{fontSize: 14, fontWeight: '600'}}>
                    (+91) {contractorDetails?.mobile}
                  </Text>
                </View>
                <View style={{marginTop: 20, marginLeft: 15}}>
                  <Text style={{fontSize: 14, fontWeight: '700'}}>
                    {t('area')}
                  </Text>
                </View>
                <View style={{marginTop: 10, marginLeft: 35}}>
                  <Text style={{fontSize: 14, fontWeight: '600'}}>
                    {contractorDetails?.city_name},
                    {contractorDetails?.state_name}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  applyJob();
                }}
                style={styles.sendOtpBtn}>
                <View>
                  <Text style={styles.otpText}>{t('applyNow')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
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
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  hightLightTab: {
    width: '50%',
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
    marginTop: 30,
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
    marginTop: 38,
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
    marginRight: 30,
  },
  DashboardMainContainer: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
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

export default ViewWork;
