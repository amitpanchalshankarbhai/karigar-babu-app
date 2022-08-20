import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  JobIcon,
  WorkApplicant,
  WatchJobIcon,
  RightIcon,
  LocationIcon,
  ExperienceSuitcaseIcon,
  SalaryIcon,
  FilterIcon,
  BackArrowIcon,
  MoreIcon,
} from '../../common/icons';
import BottomSheet from 'reanimated-bottom-sheet';
import {Dropdown} from 'react-native-element-dropdown';
import LabourApi from '../../services/Labour.service';
import {useTranslation} from 'react-i18next';
import {getStoreValue, setStoreValue} from '../../common/LocalStorage';
import Loader from '../../common/Loader';
import IndustryApi from '../../services/Industry.service';
import CommonApis from '../../services/Common.service';
import NotFoundData from '../../common/components/NotFoundData';
import Pagination from '../../common/components/Pagination';
import {DataTable} from 'react-native-paper';
import {ASSET_BASE_URL} from '../../URL';
import moment from 'moment';

const LabourObj = new LabourApi();
const industryObj = new IndustryApi();
const LocalityObj = new CommonApis();

const LabourDashboard = ({navigation}: any) => {
  const [showFilter, setshowFilter] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<any>('');
  const [jobs, setJobs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [city, setCity] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [workPrice, setWorkPrice] = useState('');
  const [curPage] = React.useState(0);
  const paginationRef = useRef();
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const [industry, setIndustry] = useState<any>([]);
  const {t, i18n} = useTranslation();
  const language = [
    {label: 'English', value: '1'},
    {label: 'Hindi', value: '2'},
    {label: 'Gujrati', value: '3'},
  ];

  const [currentLanguage, setLanguage] = useState('English');
  const [isEnabled, setIsEnabled] = useState(false);
  const [totalPages, setTotalPages] = useState<any>();
  const numberOfItemsPerPageList = [3];
  const [page, setPage] = React.useState(1);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const [userProfile, setUserProfile] = useState<any>('');
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, jobs.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);
  const changeLanguage = (value: any) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setJobs([]);
    setLoader(true);
    setInterval(() => {
      const getLatestJobs = async () => {
        const requestBody = {
          user_id: await getStoreValue('userId'),
          page: page,
        };
        let response: any = await LabourObj.getLatestJobs(requestBody);
        if (response?.data?.status == 404) {
          setLoader(false);
          console.log('response?.data?.data?.data', response?.data?.data?.data);
        } else if (response?.data?.data?.data) {
          setLoader(false);
          setTotalPages(response?.data?.data?.last_page);
          setJobs(response?.data?.data?.data);
        }
      };
      getLatestJobs();
    }, 5000);
   
  }, [page]);

  useEffect(() => {
    const getIndustry = async () => {
      const response = await industryObj.getIndustry();
      const {data} = response.data;
      const industryList: any = [];
      data?.map((industryType: any) => {
        industryList.push({
          label: industryType.work_name,
          value: industryType.id,
        });
      });
      setIndustry(industryList);
    };

    getIndustry();
  }, []);

  useEffect(() => {
    const getCityAndState = async () => {
      let cities: any = [];
      let stateList: any = [];
      const stateResponse = await LocalityObj.getState();
      stateResponse.data.data.map((stateObj: any) => {
        stateList?.push({
          label: stateObj.state_name,
          value: stateObj.id,
        });
      });
      setState(stateList);
      const cityResponse = await LocalityObj.getCities({
        state_id: selectedStateId,
      });
      cityResponse.data.data.map((cityObj: any) => {
        cities?.push({
          label: cityObj.city_name,
          value: cityObj.id,
        });
      });
      setCity(cities);
    };
    getCityAndState();
  }, [selectedState]);

  useEffect(() => {
    const getWorkingStatus = async () => {
      const userId = await getStoreValue('userId');
      const userProfile = await getStoreValue('userProfile');

      setUserProfile(userProfile);
      const requestBody = {
        user_id: userId,
      };
      let response: any = await LabourObj.getOnlineStatus(requestBody);

      if (response?.data?.data) {
        setIsEnabled(response.data.data.status === 0 ? false : true);
      }
      let language = await getStoreValue('language');
      const currentLanuage =
        language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Gujrati';

      changeLanguage(currentLanuage);
      setValue(currentLanuage);
    };
    getWorkingStatus();
  }, []);

  const renderContent = () => (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            borderWidth: 4,
            borderColor: 'rgba(18, 18, 18, 0.2)',
            width: 70,
            marginTop: 20,
            borderRadius: 10,
          }}></View>
        <View style={styles.loginFieldContainer}>
          <View>
            <Text style={styles.phoneNo}>
              {t('industry')} <Text style={styles.mandatoryText}>*</Text>
            </Text>
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              dropdownPosition={'bottom'}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={{marginTop: -38}}
              iconStyle={styles.iconStyle}
              data={industry}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedIndustry(item.label);
                setIsFocus(false);
              }}
            />
          </View>

          <View>
            <Text style={styles.phoneNo}>
              {t('state')} <Text style={styles.mandatoryText}>*</Text>
            </Text>
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              dropdownPosition={'bottom'}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={{marginTop: -38}}
              iconStyle={styles.iconStyle}
              data={state}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={selectedStateId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedState(item.label);
                setSelectedStateId(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View>
            <Text style={styles.phoneNo}>
              {t('city')} <Text style={styles.mandatoryText}>*</Text>
            </Text>
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              dropdownPosition={'bottom'}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              containerStyle={{marginTop: -38}}
              iconStyle={styles.iconStyle}
              data={city}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={selectedCityId}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSelectedCity(item.label);
                setSelectedCityId(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View>
            <Text style={styles.phoneNo}>
              {t('area')} <Text style={styles.mandatoryText}>*</Text>
            </Text>
          </View>
          <View>
            <TextInput
              onChangeText={(value: any) => {
                setSelectedArea(value);
              }}
              selectionColor={'#FEA700'}
              style={styles.phoneNoInput}></TextInput>
          </View>
          <View>
            <Text style={styles.phoneNo}>
              {t('price')} <Text style={styles.mandatoryText}>*</Text>
            </Text>
          </View>
          <View>
            <TextInput
              keyboardType="numeric"
              onChangeText={(value: any) => {
                setWorkPrice(value);
              }}
              selectionColor={'#FEA700'}
              style={styles.phoneNoInput}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Contractor')}
            style={styles.sendOtpBtn}>
            <View>
              <Text style={styles.otpText}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const becomeOnline = async () => {
    const requestBody = {
      user_id: await getStoreValue('userId'),
      status: isEnabled ? 0 : 1,
    };
    let response: any = await LabourObj.becomeOnline(requestBody);
  };

  const sheetRef: any = React.useRef(0);
  return (
    <View style={{flex: 1}}>
      <View
        style={
          showFilter
            ? {backgroundColor: '#333333'}
            : {backgroundColor: 'white', height: '100%'}
        }>
        {/* {showFilter && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[550, 0, 0]}
          borderRadius={10}
          renderContent={renderContent}
          onCloseEnd={() => {
            setshowFilter(false);
          }}
        />
      )} */}
        <View>
          <View style={styles.DashboardMainContainer}>
            <View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      marginRight: 20,
                    }}
                    source={{
                      uri: `https://assets.datahayinfotech.com/assets/storage/${userProfile}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{display: 'flex', flexDirection: 'row'}}>
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
                  style={styles.languageDropdown}
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
                  placeholder={value === '' ? 'Lanuguage' : `${value}`}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={async item => {
                    setIsFocus(false);
                    setValue(item.label);
                    changeLanguage(item.label);
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 18,
                }}>
                {t('yourWorkingStatus')}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                marginTop: 20,
                marginRight: '5%',
              }}>
              <Text>Offline</Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Switch
                  trackColor={{false: '#767577', true: '#1c3857'}}
                  thumbColor={isEnabled ? '#FEA700' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    setIsEnabled(!isEnabled);
                    becomeOnline();
                  }}
                  value={isEnabled}
                />
              </View>
              <Text>Online</Text>
            </View>
          </View>

          {loader ? (
            <View style={{marginTop: -100}}>
              <Loader />
            </View>
          ) : (
            <ScrollView>
              <View style={{height: '100%', marginBottom: 170}}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 18,
                        marginLeft: 22,
                        marginTop: 20,
                      }}>
                      {t('recentWorks')}
                    </Text>
                    {/* <View
                    style={{
                      marginTop: 20,
                      marginRight: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setshowFilter(true);
                        sheetRef.current.snapTo(0);
                      }}>
                      <FilterIcon />
                    </TouchableOpacity>
                  </View> */}
                  </View>
                  {jobs?.length > 0 ? (
                    jobs?.map((job: any) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            navigation.navigate('ViewWork', {jobInfo: job});
                          }}>
                          <View
                            style={
                              showFilter
                                ? styles.workCardContainerInBottomSheet
                                : styles.workCardContainer
                            }>
                            <View style={styles.workTitleContainer}>
                              <View style={{marginLeft: 10}}>
                                <JobIcon />
                              </View>
                              <View style={{marginLeft: 10}}>
                                <View>
                                  <Text>{job?.description}</Text>
                                </View>
                                <View style={{marginTop: 5}}>
                                  <Text>
                                    <WorkApplicant />
                                    {'  '}
                                    <Text
                                      style={{
                                        marginLeft: 20,
                                        color: '#1C3857',
                                      }}>
                                      {job.no_of_labours}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginLeft: 10,
                                marginTop: 10,
                              }}>
                              <View>
                                <LocationIcon />
                              </View>
                              <View
                                style={{
                                  marginLeft: 10,
                                }}>
                                <Text>
                                  {job.locality},{job.city},{job.state}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginLeft: 10,
                                marginTop: 10,
                              }}>
                              <View>
                                <ExperienceSuitcaseIcon />
                              </View>
                              <View
                                style={{
                                  marginLeft: 10,
                                }}>
                                <Text>{job.experience_required} Years</Text>
                              </View>
                            </View>

                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginLeft: 10,
                                marginTop: 10,
                              }}>
                              <View>
                                <SalaryIcon />
                              </View>
                              <View
                                style={{
                                  marginLeft: 10,
                                }}>
                                <Text>Salary: {job.price}</Text>
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
                                <Text style={{color: 'rgba(18, 18, 18, 0.35)'}}>
                                {" "} Created on {moment().format('DD-MMM-YYYY')}
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginRight: 20,
                                }}>
                                <Text style={{color: '#FEA700'}}>
                                  {t('applyNow')}
                                </Text>
                                <RightIcon />
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <View style={{marginTop: hp('-25%')}}>
                      <NotFoundData
                        errorHeader={t('noWorkFound')}
                        errorDescription={t('waitUntillContractorPostAJob')}
                      />
                    </View>
                  )}
                  <DataTable>
                    <DataTable.Pagination
                      page={page}
                      numberOfPages={totalPages}
                      onPageChange={page => {
                        setPage(page);
                      }}
                      label={`${page + 1} of ${totalPages}`}
                      showFastPaginationControls
                      numberOfItemsPerPageList={numberOfItemsPerPageList}
                      // numberOfItemsPerPage={numberOfItemsPerPage}
                      onItemsPerPageChange={onItemsPerPageChange}
                      selectPageDropdownLabel={'Rows per page'}
                    />
                  </DataTable>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DashboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  DashboardMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
    marginLeft: 20,
  },
  workCardContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  workCardContainerInBottomSheet: {
    borderRadius: 15,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
    height: '100%',
  },
  workTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  notification: {
    marginRight: 10,
  },
  AddWorkSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#1a104c',
  },
  AddWorkText: {
    color: '#1a104c',
    fontSize: 20,
    fontWeight: '600',
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
    marginVertical: 30,
  },
  AddWorkBox: {
    height: 140,
    width: 140,
    backgroundColor: '#1a104c',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectLabour: {
    height: 140,
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
  SelectLabourText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  LoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
    backgroundColor: '#1c3857',
  },
  firstPortion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -140,
    marginTop: -200,
  },
  mandatoryText: {
    color: '#FEA700',
  },
  registerHeaderSecoundLine: {
    marginTop: 5,
    color: 'rgba(255, 255, 255, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerHeaderText: {
    color: 'rgba(255, 255, 255, 0.65)',
  },
  karigarLogoContainer: {
    height: hp('20%'),
    width: 100,
    marginTop: 300,
    resizeMode: 'cover',
  },
  karigarLogo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  starterHeader: {
    fontSize: 24,
    color: 'white',
  },
  starterHeaderDescContainer: {
    height: 200,
  },
  starterDescHeader: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.65)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginFieldContainer: {
    height: hp('90%'),
    width: 314,
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: 50,
    marginTop: 25,
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
    marginTop: 15,
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
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FEA700',
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
  languageDropdown: {
    width: '90%',
    height: 40,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1);',
    padding: 10,
    borderRadius: 20,
  },

  dropdown: {
    width: '90%',
    height: 40,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
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
    borderRadius: 20,
  },
});

export default LabourDashboard;
