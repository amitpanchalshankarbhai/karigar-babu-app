import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Switch} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStoreValue, setStoreValue} from '../../common/LocalStorage';
import LabourApi from '../../services/Labour.service';
import {ASSET_BASE_URL} from '../../URL';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
const language = [
  {label: 'English', value: '1'},
  {label: 'Hindi', value: '2'},
  {label: 'Guj', value: '3'},
];
const LabourObj = new LabourApi();
const Online = ({navigation}: any) => {
  const [showFilter, setshowFilter] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [work, setWork] = useState([]);
  const [value, setValue] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [userProfile, setUserProfile] = useState<any>('');
  const {t, i18n} = useTranslation();
  const [showLogoutDialog, setShowDialog] = useState(false);
  const language = [
    {label: 'English', value: '1'},
    {label: 'Hindi', value: '2'},
    {label: 'Gujrati', value: '3'},
  ];

  const [currentLanguage, setLanguage] = useState('English');

  const changeLanguage = (value: any) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

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

  const becomeOnline = async () => {
    const requestBody = {
      user_id: await getStoreValue('userId'),
      status: isEnabled ? 0 : 1,
    };
    let response: any = await LabourObj.becomeOnline(requestBody);
  };

  const sheetRef: any = React.useRef(null);
  return (
    <View style={{flex: 1}}>
      <View
        style={
          showFilter
            ? {backgroundColor: '#333333'}
            : {backgroundColor: 'white', height: '100%'}
        }>
        <ScrollView>
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
                onChange={async item => {
                  const currentLanuage =
                    item.value === 1 ? 'en' : item.value === 2 ? 'hi' : 'gu';
                  await setStoreValue({
                    key: 'language',
                    value: currentLanuage,
                  });
                  setValue(item.value);
                  changeLanguage(item.label);
                  setIsFocus(false);
                }}
              />
              <View style={{marginRight: 40, marginLeft: 10}}>
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
            <View>
              <Image
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 300,
                  width: '100%',
                  marginRight: 20,
                  marginTop: 100,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/LabourCutting.png`,
                }}
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.centerText}>{t('turnOnHeading')} </Text>
          </View>
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
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.onlineDescription}>{t('waitWorkDesc')}</Text>
            <Text style={styles.onlineDescription}>{t('someOneBook')}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', marginTop: 10}}>
              {t('or')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LabourDashboard')}
            style={styles.sendOtpBtn}>
            <View>
              <Text style={styles.otpText}>{t('applyInWork')}</Text>
            </View>
          </TouchableOpacity>
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
    height: '100%',
    // width: '100%',
  },
  centerText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  onlineDescription: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(18, 18, 18, 0.65);',
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
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
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
    marginTop: 10,
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
});

export default Online;
