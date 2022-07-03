import React, {useEffect, useState} from 'react';
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
import {UploadImage} from '../common/icons';
import {ScrollView} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import LabourApi from '../services/Labour.service';
import IndustryApi from '../services/Industry.service';
import CommonApis from '../services/Common.service';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStoreValue} from '../common/LocalStorage';
import {launchImageLibrary} from 'react-native-image-picker';
import {ASSET_BASE_URL} from '../URL';

// import * as ImagePicker from "expo-image-picker";
const data = [
  {label: '1 year', value: '1'},
  {label: '2 year', value: '2'},
  {label: '3 year', value: '3'},
  {label: '4 year', value: '4'},
  {label: '5 year', value: '5'},
  {label: '6 year', value: '6'},
  {label: '7 year', value: '7'},
  {label: '8 year', value: '8'},
];
const LocalityObj = new CommonApis();
const LabourObj = new LabourApi();
const industryObj = new IndustryApi();
const SignupLabour = ({navigation}: any) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fullName, setFullName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [year, setSelectedYear] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [industry, setIndustry] = useState<any>([]);
  const [selectedExperience, setSelectedExperience] = useState<any>([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [image, setImage] = useState<any>();
  const [emptyName, setEmptyName] = useState(false);
  const [emptyIndustry, setEmptyIndustry] = useState(false);
  const [emptyExperience, setEmptyExperience] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);
  const {t, i18n} = useTranslation();
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
        if(!response?.didCancel){
          setImage(response.assets[0]);
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
      if (phoneNo) {
        setMobile(phoneNo);
      }
      const {data} = response.data;
      data?.map((industryType: any) => {
        industry.push({
          label: industryType.work_name,
          value: industryType.id,
        });
      });
    };
    getIndustry();
  }, []);

  const validateForm = (e: any) => {
    e.preventDefault();
    fullName == '' ? setEmptyName(true) : setEmptyName(false);
    selectedExperience == ''
      ? setEmptyExperience(true)
      : setEmptyExperience(false);
    selectedIndustry == '' ? setEmptyIndustry(true) : setEmptyIndustry(false);
    image == undefined ? setEmptyImage(true) : setEmptyImage(false);
    if (
      fullName.length > 0 &&
      selectedExperience &&
      selectedIndustry &&
      image
    ) {
      onSaveLabour();
    }
  };

  const onSaveLabour = async () => {
    const requestBody = {
      full_name: fullName,
      mobile: mobile,
      locality: selectedArea,
      city: selectedCity,
      state: selectedState,
      experience: year,
      industry: selectedIndustry,
      profile_pic: image,
      user_type: 1,
    };
    navigation.navigate('signupLabourAddress', {
      requestBody: requestBody,
    });
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
                      source={{uri: image.uri}}
                    />
                  ) : (
                    <UploadImage />
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.fieldsContainer}>
                <Text style={styles.phoneNo}>
                  {t('fullName')} <Text style={styles.mandatoryText}>*</Text>
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
              <View style={styles.fieldsContainer}>
                <Text style={styles.phoneNo}>
                  {t('industry')} <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  containerStyle={{marginTop: -38}}
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
              <View style={styles.fieldsContainer}>
                <Text style={styles.phoneNo}>
                  {t('experience')} <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  containerStyle={{marginTop: -38}}
                  data={data}
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
                    setSelectedYear(item.value);
                    setSelectedExperience(item.label);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={styles.fieldsContainer}>
                <Text style={styles.phoneNo}>
                  {t('phoneNo')} <Text style={styles.mandatoryText}>*</Text>
                </Text>
              </View>
              <View>
                <TextInput
                  value={mobile}
                  editable={false}
                  onChangeText={(value: any) => {
                    setMobile(value);
                  }}
                  keyboardType={'number-pad'}
                  selectionColor={'#FEA700'}
                  style={styles.phoneNoInput}></TextInput>
              </View>

              <View style={{marginTop: 20, marginLeft: 20}}>
                {emptyName && (
                  <Text style={{color: 'red'}}>
                    {t('fullName')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 10, marginLeft: 20}}>
                {emptyIndustry && (
                  <Text style={{color: 'red'}}>
                    {t('industry')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 10, marginLeft: 20}}>
                {emptyExperience && (
                  <Text style={{color: 'red'}}>
                    {t('experience')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 10, marginLeft: 20}}>
                {emptyImage && (
                  <Text style={{color: 'red'}}>
                    {t('Photo')} {t('isRequired')}
                    {'*'}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={e => {
                  validateForm(e);
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
    height: hp('100%'),
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
    marginBottom: -140,
    marginTop: -200,
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

export default SignupLabour;
