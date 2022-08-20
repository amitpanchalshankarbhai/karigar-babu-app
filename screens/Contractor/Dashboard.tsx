import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import {
  JobIcon,
  WorkApplicant,
  WatchJobIcon,
  RightIcon,
} from '../../common/icons';
import Colors from '../../constants/Colors';
import ContractorApi from '../../services/Contractor.service';
import { getStoreValue } from '../../common/LocalStorage';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Loader from '../../common/Loader';
import NotFoundData from '../../common/components/NotFoundData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Pagination from '../../common/components/Pagination';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import { diffYMDHMS } from '../../common/utils';
import AreaSuggestion from '../../common/components/AreaSuggestion';
import { ASSET_BASE_URL } from '../../URL';
import Dialog from 'react-native-dialog';

const ContractorObj = new ContractorApi();
const Dashboard = ({ navigation, route }: any) => {
  const [isWork, setIsWork] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [work, setWork] = useState([]);
  const [labourInfo, setLabourInfo] = useState([]);
  const [value, setValue] = useState<any>('');
  const [loader, setLoader] = useState(true);
  const [userInfo, setUserInfo] = useState<any>({});
  const [totalPages, setTotalPages] = useState<any>();
  const layout = useWindowDimensions();
  const [userProfile, setUserProfile] = useState<any>('');
  const [showLogoutDialog, setShowDialog] = useState(false);
  const [page, setPage] = React.useState(1);
  const [actualPage, setActualPage] = React.useState(1);
  let isJobCreated = route?.params?.isJobCreated;
  const { t, i18n } = useTranslation();

  const [currentSelectedLanguage, setCurrentSelectedLanguage] =
    useState<any>('');

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'labour', title: t('karigar') },
    { key: 'work', title: t('yourWork') },
  ]);

  const language = [
    { label: 'English', value: '1' },
    { label: 'Hindi', value: '2' },
    { label: 'Gujrati', value: '3' },
  ];

  useEffect(() => {
    const getSelectedLanuge = async () => {
      let currentSelectedLanguage = await getStoreValue('language');
      let userInfo: any = await getStoreValue('userInfo');

      setUserInfo(JSON.parse(userInfo));
      setCurrentSelectedLanguage(currentSelectedLanguage);
    };

    getSelectedLanuge();
  }, []);

  useEffect(() => {
    setInterval(() => {
      const getCreatedWork = async () => {
        let userId = await getStoreValue('userId');
        let language = await getStoreValue('language');
        const userProfile = await getStoreValue('userProfile');
        setUserProfile(
          `https://assets.datahayinfotech.com/assets/storage/${userProfile}`,
        );
        let res = await ContractorObj.getCreatedWork({ user_id: userId });
        let laboursInfo = await ContractorObj.getOnlineLabour({
          user_id: userId,
          page: actualPage
        });
        console.warn("LaboursInfo",laboursInfo);
        setWork(res?.data?.data);
        setTotalPages(laboursInfo?.data?.data?.labourList.last_page);
        setLabourInfo(laboursInfo?.data?.data?.labourList.data);
        debugger;
        setLoader(false);
        setActualPage(1);
      };
      
      getCreatedWork();
    }, 5000);
  }, [actualPage]);

  useEffect(() => {
    const getCreatedWork = async () => {
      let userId = await getStoreValue('userId');
      let res = await ContractorObj.getCreatedWork({ user_id: userId });
      let laboursInfo = await ContractorObj.getOnlineLabour({
        user_id: userId,
      });
      if (laboursInfo?.status) {
        setLoader(false);
      }

      setWork(res?.data?.data);
      setTotalPages(laboursInfo?.data?.data?.labourList.last_page);

      setLabourInfo(laboursInfo?.data?.data?.labourList.data);
    };
    getCreatedWork();
  }, [isJobCreated]);

  const [currentLanguage, setLanguage] = useState('English');
  const numberOfItemsPerPageList = [5];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, labourInfo?.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);
  const changeLanguage = (value: any) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  const YourWork = () => {
    if (!work) {
      return (
        <View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.createJobTitle}>
              {t('jobCreateTabHeadOne')}
            </Text>
            <Text style={styles.createJobTitle}>
              {t('jobCreateTabHeadTwo')}
            </Text>
          </View>

          <View>
            <Image
              style={{
                width: '80%',
                height: 200,
                marginLeft: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode={'cover'}
              source={{
                uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/gifs/NoJobsFound.gif`,
              }}
            />
          </View>

          <View style={styles.noActiveJobText}>
            <Text style={styles.noActiveJobsTextDetails}>
              {t('noActiveJob')}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text>{t('workTo')}</Text>
            <Text>{t('predefinedInterval')}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={{ height: '100%', marginBottom: 100, elevation: 100 }}>
            <View>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 20,
                  marginLeft: 20,
                  marginTop: 20,
                }}>
                {t('youRecentlyCreatedJob')}
              </Text>
            </View>
            {work?.map((item: any) => {
              const now = moment(new Date()); //todays date
              const end = moment(item.created_at); // another date
              let hours = now.diff(end, 'hours');
              hours = Math.abs(hours);
              // const duration = moment.duration(now.diff(end));
              // const hours = duration.asHours();
              // let diff = diffYMDHMS(moment(now), moment(end));
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    navigation.navigate('ViewJob', {
                      jobInfo: item,
                    });
                  }}>
                  <View style={styles.workCardContainer}>
                    <View style={styles.workTitleContainer}>
                      <View style={{ marginLeft: 10 }}>
                        <JobIcon />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <View>
                          <Text>{item?.description}</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                          <Text>
                            <WorkApplicant />
                            {'  '}
                            <Text style={{ marginLeft: 20, color: '#1C3857' }}>
                              1
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(18, 18, 18, 0.1);',
                        marginTop: 10,
                      }}
                    />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                        marginBottom: 12,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: 20,
                        }}>
                        <WatchJobIcon />
                        <Text style={{ color: 'rgba(18, 18, 18, 0.35)' }}>
                         {" "} Created on {moment().format('DD-MMM-YYYY')}
                          {/* {Math.ceil(hours)} Hours ago */}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 20,
                        }}>
                        <Text style={{ color: '#FEA700' }}>{t('viewNow')}</Text>
                        <RightIcon />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    }
  };

  const bookALabour = async (item: any) => {
    const userId = await getStoreValue('userId');
    const counterRes = await ContractorObj.getFreeTrialCounter({
      user_id: userId,
    });
    navigation.navigate('ViewLabour', {
      jobInfo: item,
      trialCount: counterRes?.data?.data?.trial,
    });
  };

  const Labour = () => {
    return (
      <ScrollView>
        <View style={{ marginBottom: 40 }}>
          {loader ? (
            <View style={{ marginTop: -100 }}>
              <Loader />
            </View>
          ) : (
            <View>
              {/* <Pagination item={labourInfo} pageSize={5} /> */}
              {labourInfo?.length > 0 ? (
                labourInfo?.map((item: any) => {
                  return (
                    <View key={item.unique_id}>
                      <TouchableOpacity
                        style={styles.LabourContainer}
                        onPress={() => {
                          bookALabour(item);
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: -10,
                            width: '50%',
                          }}>
                          <View>
                            <Image
                              style={{
                                height: 65,
                                width: 65,
                                borderRadius: 32.5,
                              }}
                              source={
                                item.profile_pic
                                  ? {
                                    uri: `https://assets.datahayinfotech.com/assets/storage/${item.profile_pic}`,
                                  }
                                  : {
                                    uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/userIcon.webp`,
                                  }
                              }
                            />
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginLeft: 50,
                                marginTop: -10,
                                backgroundColor: '#07B104',
                              }}
                            />
                          </View>
                          <View style={{ marginLeft: 15 }}>
                            <View>
                              <Text>{item?.full_name}</Text>
                            </View>
                            <View>
                              <Text style={{ color: 'rgba(18, 18, 18, 0.3);' }}>
                                {item?.industry}
                              </Text>
                            </View>
                            <View>
                              <Text style={{ color: '#07B104', fontSize: 12 }}>
                                Online
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <Text style={{ color: '#FEA700', marginTop: -2 }}>
                            {t('bookLabour')}
                          </Text>
                          <RightIcon />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <NotFoundData
                  errorHeader={t('noWorkerFound')}
                  errorDescription={t('waitUntillSomeOneOnline')}
                />
              )}
            </View>
          )}

        </View>
      </ScrollView>
    );
  };

  const renderScene = SceneMap({
    labour: Labour,
    work: YourWork,
  });

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <View style={styles.DashboardMainContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <View>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    marginRight: 20,
                  }}
                  source={{
                    uri: userProfile,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
              marginTop: -5,
            }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={{
                marginTop: -38,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                width: 80,
                marginLeft: 15,
              }}
              maxHeight={160}
              iconStyle={styles.iconStyle}
              data={language}
              labelField="label"
              valueField="value"
              placeholder={value === '' ? 'Language' : `${value}`}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setIsFocus(false);
                setValue(item.label);
                changeLanguage(item.label);
              }}
            />
            <View style={{ marginRight: 40, marginLeft: 10 }}>
              <AntDesign
                name="logout"
                size={24}
                color="#1c3857"
                onPress={() => {
                  setShowDialog(true);
                }}
              />
            </View>
            {showLogoutDialog && (
              <View>
                <Dialog.Container visible={showLogoutDialog}>
                  <Dialog.Title>Account Logout</Dialog.Title>
                  <Dialog.Description>
                    Are you sure you want to Logout
                  </Dialog.Description>
                  <Dialog.Button
                    onPress={() => {
                      setShowDialog(false);
                    }}
                    label="Cancel"
                  />
                  <Dialog.Button
                    onPress={async () => {
                      try {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('userInfo');
                        console.log('Data removed');
                      } catch (exception) {
                        console.log(exception);
                      }
                      navigation.navigate('Login');
                    }}
                    label="Logout"
                  />
                </Dialog.Container>
              </View>
            )}
          </View>
        </View>

        <View>
          <Text style={styles.morningText}>
            {t('goodMorning')}, {userInfo?.full_name}
          </Text>
        </View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#1c3857' }}
              style={{ backgroundColor: 'white' }}
              renderLabel={({ focused, route }) => {
                return (
                  <Text style={focused ? { color: '#1c3857' } : { color: 'grey' }}>
                    {route.title}
                  </Text>
                );
              }}
            />
          )}
        />
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginTop: -100,
          marginRight: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddWork');
          }}
          style={styles.createWork}>
          <Text>
            <AntDesign name="plus" size={24} color="white" onPress={() => { }} />
          </Text>
          <Text style={{ color: 'white' }}> {t('createWork')}</Text>
        </TouchableOpacity>
      </View>
      {totalPages && <DataTable>
        <DataTable.Pagination
          page={page}
          numberOfPages={totalPages}
          onPageChange={page => {
            setActualPage(page  + 1);
            setPage(page);
            setLoader(true);
          }}
          label={`${page + 1} of ${totalPages}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          // numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>}
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
  createWork: {
    width: 173,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: '#FEA700',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DashboardTabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  hightLightTabOne: {
    width: '50%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(18, 18, 18, 0.3);',
  },
  hightLightTabTwo: {
    width: '50%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(18, 18, 18, 0.3);',
  },
  dropdown: {
    width: '90%',
    height: 40,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1);',
    borderRadius: 25,
    padding: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
  },
  workCardContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    // shadowColor: 'white',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 1,
    // shadowRadius: 8,
    elevation: 3,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  LabourContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 20,
  },
  otpText: {
    color: 'white',
  },
  notification: {
    marginRight: 10,
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
    marginTop: 20,
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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

export default Dashboard;
