import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import { UploadImage } from '../common/icons';
import { Dropdown } from 'react-native-element-dropdown';
import IndustryApi from '../services/Industry.service';
import ContractorApi from '../services/Contractor.service';
import CommonApis from '../services/Common.service';
import { useTranslation } from 'react-i18next';
import { getStoreValue } from '../common/LocalStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ASSET_BASE_URL } from '../URL';
import { Container } from 'native-base';

const industryObj = new IndustryApi();
const LocalityObj = new CommonApis();
const SignupContractor = ({ navigation }: any) => {
  const [value, setValue] = useState(null);
  const [fullName, setFullName] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [industry, setIndustry] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [socialLogin, setSocialLogin] = useState<any>(false);
  const [showEmptyFieldError, setShowEmptyFieldError] = useState<any>({
    name: false,
    industry: false,
    phoneNo: false,
    image: false,
  });
  const [emptyFullname, setEmptyFullname] = useState(false);
  const [emptyWorkType, setEmptyWorkType] = useState(false);
  const [emptyPhoto, setEmptyPhoto] = useState(false);
  const [image, setImage] = useState<any>();
  const { t, i18n } = useTranslation();

  const chooseFile = async () => {
    let options: any = {
      title: 'Select Image',
      includeBase64: true,
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      const result = await launchImageLibrary(options, (response: any) => {
        if (!response?.didCancel) {
          setImage(response?.assets[0]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getIndustry = async () => {
      const response = await industryObj.getIndustry();
      let phoneNo = await getStoreValue('phoneNo');
      let socialLogin = await getStoreValue('socialLogin');
      setSocialLogin(socialLogin);
      if (phoneNo) {
        setphoneNo(phoneNo);
      }
      const { data } = response.data;
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

  const onSaveContractor = async () => {
    const requestBody = {
      full_name: fullName,
      mobile: phoneNo,
      locality: selectedArea,
      city: selectedCity,
      state: selectedState,
      industry: selectedIndustry,
      profile_pic: image,
      user_type: 2,
    };
    if (fullName && phoneNo && selectedIndustry && image) {
      navigation.navigate('signupContractorAddress', {
        requestBody: requestBody,
      });
    }
  };
  const validateForm = () => {
    fullName == '' ? setEmptyFullname(true) : setEmptyFullname(false);
    selectedIndustry == '' ? setEmptyWorkType(true) : setEmptyWorkType(false);
    image == undefined ? setEmptyPhoto(true) : setEmptyPhoto(false);
    if (fullName && selectedIndustry && image) {
      onSaveContractor();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
      }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.LoginContainer}>
          <ScrollView
            contentContainerStyle={{ padding: 10 }}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.firstPortion}>
              <View style={styles.karigarLogoContainer}>
                <Image
                  style={styles.karigarLogo}
                  source={{
                    uri: `https://assets.datahayinfotech.com/assets/images/karigar_babu/contactor-removebg-preview.png`,
                  }}
                />
              </View>
              <View>
                <Text style={styles.starterHeader}>
                  {t('registerContractorHeading')}
                </Text>
              </View>
              <View style={styles.starterHeaderDescContainer}>
                <Text style={styles.starterDescHeader}>{t('giveInfo')}</Text>
                <View style={styles.registerHeaderSecoundLine}>
                  <Text style={styles.registerHeaderText}>
                    {t('forFindWork')}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View style={styles.loginFieldContainer}>
              <TouchableOpacity
                onPress={() => {
                  chooseFile();
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: 50,
                  }}>
                  {image?.uri ? (
                    <Image
                      style={styles.karigarLogo}
                      source={{ uri: image.uri }}
                    />
                  ) : (
                    <UploadImage />
                  )}
                </View>
              </TouchableOpacity>
              <View>
                <Text style={styles.phoneNo}>
                  {t('fullName')}
                  <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <TextInput
                  value={fullName}
                  onChangeText={(value: any) => {
                    setFullName(value);
                  }}
                  selectionColor={'#FEA700'}
                  style={styles.phoneNoInput}></TextInput>
              </View>

              <View>
                <Text style={styles.phoneNo}>
                  {t('industry')} <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  dropdownPosition={'bottom'}
                  inputSearchStyle={styles.inputSearchStyle}
                  containerStyle={{ marginTop: -38 }}
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
                  {t('phoneNo')} <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <TextInput
                  editable={socialLogin ? true : false}
                  value={phoneNo}
                  keyboardType={'number-pad'}
                  selectionColor={'#FEA700'}
                  style={styles.phoneNoInput}></TextInput>
              </View>

              <View style={{ marginTop: 20, marginLeft: 20 }}>
                {emptyFullname && (
                  <Text style={{ color: 'red' }}>
                    {t('fullName')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 10, marginLeft: 20 }}>
                {emptyWorkType && (
                  <Text style={{ color: 'red' }}>
                    {t('industry')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <View style={{ marginTop: 10, marginLeft: 20 }}>
                {emptyPhoto && (
                  <Text style={{ color: 'red' }}>
                    {t('Photo')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={e => {
                  validateForm();
                }}
                style={styles.sendOtpBtn}>
                <View>
                  <Text style={styles.otpText}>{t('next')}</Text>
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
  firstPortion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:hp('55%'),
    marginTop: -110,
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
    borderRadius: 60,
    resizeMode: 'contain',
  },
  starterHeader: {
    fontSize: 24,
    color: 'white',
  },
  starterHeaderDescContainer: {
    height: 200,
    display: 'flex',
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
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    opacity: 0.8,
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

export default SignupContractor;
