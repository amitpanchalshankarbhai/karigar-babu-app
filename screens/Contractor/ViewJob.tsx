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
  ExperienceSuitcaseIcon,
  RatingStarIcon,
} from '../../common/icons';
import Colors from '../../constants/Colors';
import ContractorApi from '../../services/Contractor.service';
import Loader from '../../common/Loader';
import {useTranslation} from 'react-i18next';
import NotFoundData from '../../common/components/NotFoundData';
import {getStoreValue} from '../../common/LocalStorage';
import {ASSET_BASE_URL} from '../../URL';
const ContractorObj = new ContractorApi();
const ViewJobs = ({navigation, route}: any) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [applicant, setApplicant] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const jobInfo = route?.params?.jobInfo;

  const {t, i18n} = useTranslation();
  useEffect(() => {
    const getLabourInfo = async () => {
      const requestApplicantBody = {
        job_id: jobInfo?.job_id,
      };
      const response = await ContractorObj.getApplicantData(
        requestApplicantBody,
      );
      const {data} = response.data;

      if (response.data.status === 404) {
        setLoader(false);
      } else if (data) {
        setApplicant(data);
        setLoader(false);
      }
    };

    getLabourInfo();
  }, []);
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.DashboardMainContainer}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ContractorDashboard')}>
            <BackArrowIcon />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.notification}>
          <MoreIcon />
        </View> */}
      </View>
      <View style={styles.ViewJobDetailsContainer}>
        <View>
          <JobIcon />
        </View>
        <View>
          <Text style={{fontSize: 18, fontWeight: '600', marginTop: 10}}>
            {jobInfo?.title}
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 12}}>
          <LocationIcon />
          <Text style={{marginLeft: 10}}>
            {jobInfo?.city},{jobInfo?.state}
          </Text>
        </View>
      </View>

      <View style={styles.DashboadTabs}>
        <TouchableOpacity
          onPress={() => {
            setIsWork(false);
            setShowDescription(true);
          }}
          style={
            isWork === false ? styles.hightLightTab : styles.hightLightOffTab
          }>
          <View>
            <Text
              style={isWork === false ? {color: 'white'} : {color: 'black'}}>
              {t('description')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsWork(true);
            setShowDescription(false);
          }}
          style={
            isWork === true ? styles.hightLightTab : styles.hightLightOffTab
          }>
          <View>
            <Text
              style={isWork !== false ? {color: 'white'} : {color: 'black'}}>
              {t('applicant')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {showDescription ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(18, 18, 18, 0.1);',
              height: 300,
              width: 300,
              marginTop: 20,
              borderRadius: 20,
            }}>
            <View style={{marginTop: 30, marginLeft: 30}}>
              <Text style={{fontSize: 24, fontWeight: '600'}}>
                {t('workDescription')}
              </Text>
            </View>
            <View>
              <View style={styles.experienceAndWage}>
                <Text>
                  {t('description')}: {jobInfo.description}
                </Text>
              </View>

              <View style={styles.experienceAndWage}>
                <Text>
                  {t('industry')}: {jobInfo.type}
                </Text>
              </View>
              <View style={styles.experienceAndWage}>
                <Text>
                  {t('experience')}: {jobInfo.experience_required} {t('years')}
                </Text>
              </View>
              <View style={styles.experienceAndWage}>
                <Text>
                  {t('workPrice')}: {jobInfo.price} INR
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={{marginTop: 20}}>
            {loader ? (
              <View style={{marginTop: -200}}>
                <Loader />
              </View>
            ) : (
              applicant?.map((item: any) => {
                return (
                  <View style={styles.userCardContainer}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View>
                          <Image
                            style={{
                              height: 60,
                              width: 60,
                              borderRadius: 30,
                            }}
                            source={
                              item.profile_pic
                                ? {uri: `${item.profile_pic}`}
                                : {
                                    uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/userIcon.png`,
                                  }
                            }
                          />
                        </View>
                        <View style={{marginLeft: 10}}>
                          <View>
                            <Text>{item?.full_name}</Text>
                          </View>
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={{marginTop: 5}}>
                              <ExperienceSuitcaseIcon />
                            </View>
                            <Text style={{marginLeft: 10, marginTop: 4}}>
                              {item?.experience} years
                            </Text>
                          </View>
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={{marginTop: 5}}>
                              <RatingStarIcon />
                            </View>

                            <Text style={{marginLeft: 10, marginTop: 5}}>
                              4.5
                            </Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={async () => {
                          const userId = await getStoreValue('userId');

                          const counterRes =
                            await ContractorObj.getFreeTrialCounter({
                              user_id: userId,
                            });
                          if (counterRes) {
                            navigation.navigate('ViewLabour', {
                              userId: applicant[0].user_id,
                              isJob: true,
                              trialCount: counterRes.data.data.trial,
                            });
                          }
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            width: 120,
                            marginRight: 20,
                            borderWidth: 1,
                            borderColor: '#FEA700',
                            borderRadius: 10,
                            padding: 2,
                          }}>
                          <Text
                            style={{
                              color: '#FEA700',
                            }}>
                            {t('acceptAndView')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}
            {applicant?.length === 0 && (
              <View style={{marginTop: -100}}>
                <NotFoundData
                  errorHeader={'No applicant'}
                  errorDescription={'Karigar shown After any one apply'}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
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
    backgroundColor: 'white',
    borderRadius: 15,
    // shadowColor: 'white',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 1,
    // shadowRadius: 8,
    elevation: 3,
    marginTop: 5,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
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
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15,
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

export default ViewJobs;
