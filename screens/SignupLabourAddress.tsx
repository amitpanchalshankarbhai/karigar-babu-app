import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import IndustryApi from '../services/Industry.service';
import CommonApis from '../services/Common.service';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LabourApi from '../services/Labour.service';
import {setStoreValue} from '../common/LocalStorage';
import AreaSuggestion from '../common/components/AreaSuggestion';
import {ASSET_BASE_URL} from '../URL';
const LocalityObj = new CommonApis();
const industryObj = new IndustryApi();
const LabourObj = new LabourApi();
const SignupLabourAddress = ({navigation, route}: any) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [industry, setIndustry] = useState<any>([]);

  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [userWorkType, setUserWorkType] = useState();
  const [workPrice, setWorkPrice] = useState('');
  const [city, setCity] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [emptyState, setEmptyState] = useState(false);
  const [emptyCity, setEmptyCity] = useState(false);
  const [emptyArea, setEmptyArea] = useState(false);
  const [emptyWorkPrice, setEmptyWorkPrice] = useState(false);
  const [emptyWokerType, setEmptyWorkerType] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const {t, i18n} = useTranslation();

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

  const onSaveLabour = async () => {
    setShowLoader(true);
    const requestBody = {
      full_name: route?.params?.requestBody?.full_name,
      mobile: route.params.requestBody.mobile,
      locality: selectedArea,
      city: selectedCityId,
      state: selectedStateId,
      experience: route.params.requestBody.experience,
      industry: route.params.requestBody.industry,
      user_type: 1,
      labour_type: userWorkType === 1 ? 'Helper' : 'Experience Karigar',
      labour_price: workPrice,
      ...route.params.requestBody.profile_pic,
    };

    const res = await LabourObj.saveContractor(requestBody);
    setShowLoader(false);
    if (res) {
      await setStoreValue({
        key: 'userInfo',
        value: JSON.stringify(requestBody),
      });
      await setStoreValue({
        key: 'userProfile',
        value: res?.data?.data?.profile_pic,
      });
      navigation.navigate('Labour');
    }
  };

  const validateForm = () => {
    selectedState == '' ? setEmptyState(true) : setEmptyState(false);
    selectedCity == '' ? setEmptyCity(true) : setEmptyCity(false);
    selectedArea == '' ? setEmptyArea(true) : setEmptyArea(false);
    workPrice == '' ? setEmptyWorkPrice(true) : setEmptyWorkPrice(false);
    userWorkType == undefined
      ? setEmptyWorkerType(true)
      : setEmptyWorkerType(false);
    if (
      selectedState &&
      selectedCity &&
      selectedArea &&
      workPrice &&
      userWorkType
    ) {
      onSaveLabour();
    }
  };
  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.LoginContainer}>
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, padding: 10}}>
            <View style={styles.firstPortion}>
              <View style={styles.karigarLogoContainer}>
                <Image
                  style={styles.karigarLogo}
                  source={{
                    uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/LabourCutting.png`,
                  }}
                />
              </View>
              <View>
                <Text style={styles.starterHeader}>
                  {t('registerLabourHeading')}
                </Text>
              </View>
              <View style={styles.starterHeaderDescContainer}>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.starterDescHeader}>{t('giveInfo')}</Text>
                </View>

                <View style={styles.registerHeaderSecoundLine}>
                  <Text style={styles.registerHeaderText}>
                    {t('forFindWorkForLabour')}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View style={styles.loginFieldContainer}>
              <View>
                <Text style={styles.phoneNo}>
                  {t('state')} <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  dropdownPosition={'bottom'}
                  inputSearchStyle={styles.inputSearchStyle}
                  containerStyle={{marginTop: -38}}
                  iconStyle={styles.iconStyle}
                  data={state}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select state' : '...'}
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
                  selectedTextStyle={styles.selectedTextStyle}
                  dropdownPosition={'bottom'}
                  inputSearchStyle={styles.inputSearchStyle}
                  containerStyle={{marginTop: -38}}
                  iconStyle={styles.iconStyle}
                  data={city}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select city' : '...'}
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
              {/* <View>
              <TextInput
                onChangeText={(value: any) => {
                  setSelectedArea(value);
                }}
                selectionColor={'#FEA700'}
                style={styles.phoneNoInput}></TextInput>
            </View> */}
              <ScrollView>
                <AreaSuggestion
                  setLocation={(value: any) => {
                    let des = value.split(',');
                    setSelectedArea(des[0]);
                  }}
                />
              </ScrollView>
              <View>
                <Text style={styles.phoneNo}>
                  {t('yourWorkPrice')}{' '}
                  <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={(value: any) => {
                    setWorkPrice(value);
                  }}
                  keyboardType={'numeric'}
                  selectionColor={'#FEA700'}
                  style={styles.phoneNoInput}></TextInput>
              </View>
              <View>
                <Text style={styles.phoneNo}>
                  {t('workerType')} <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  dropdownPosition={'top'}
                  inputSearchStyle={styles.inputSearchStyle}
                  containerStyle={{marginTop: -38}}
                  iconStyle={styles.iconStyle}
                  data={[
                    {
                      label: 'Helper',
                      value: 1,
                    },
                    {
                      label: 'Experienced Karigar',
                      value: 2,
                    },
                  ]}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select worker type' : '...'}
                  searchPlaceholder="Search..."
                  value={userWorkType}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setUserWorkType(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={{marginTop: 20, marginLeft: 20}}>
                {emptyState && (
                  <Text style={{color: 'red'}}>
                    {t('state')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 10, marginLeft: 20}}>
                {emptyCity && (
                  <Text style={{color: 'red'}}>
                    {t('city')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 10, marginLeft: 20}}>
                {emptyArea && (
                  <Text style={{color: 'red'}}>
                    {t('area')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 10, marginLeft: 20}}>
                {emptyWokerType && (
                  <Text style={{color: 'red'}}>
                    {t('workerType')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 10, marginLeft: 20}}>
                {emptyWorkPrice && (
                  <Text style={{color: 'red'}}>
                    {t('workPrice')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>
              {showLoader && <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: 'http://assets.datahayinfotech.com/assets/images/loader.gif',
                  }}
                />
              </View>}
              <TouchableOpacity
                onPress={() => {
                  validateForm();
                }}
                style={styles.sendOtpBtn}>
                <View>
                  <Text style={styles.otpText}>{t('register')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    backgroundColor: '#1c3857',
  },
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FEA700',
  },
  mandatoryText: {
    color: '#FEA700',
  },
  firstPortion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:hp('55%'),
    marginTop: -110,
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
    borderRadius: 60,
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
    height: 'auto',
    width: 314,
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: 50,
    marginTop: 25,
    padding: 20,
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
    // boxShadow: '0 21 14 -10 rgba(228, 151, 4, 0.2)',
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
  // dropdown style

  dropdown: {
    width: '90%',
    height: 40,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
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

export default SignupLabourAddress;
