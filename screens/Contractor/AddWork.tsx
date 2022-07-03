import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {BackArrowIcon} from '../../common/icons';
import {Dropdown} from 'react-native-element-dropdown';
import ContractorApi from '../../services/Contractor.service';
import IndustryApi from '../../services/Industry.service';
import CommonApis from '../../services/Common.service';
import {getStoreValue} from '../../common/LocalStorage';
import {useTranslation} from 'react-i18next';

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

const ContractorObj = new ContractorApi();
const industryObj = new IndustryApi();
const LocalityObj = new CommonApis();

const AddWork = ({navigation}: any) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [workTitle, setWorkTitle] = useState('');
  const [workCategory, setWorkCategory] = useState('');
  const [selectedWorkExperience, setSelectedWorkExperience] = useState('');
  const [selectedWorkDescription, setSelectedWorkDescription] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');

  const [industry, setIndustry] = useState<any>([]);
  const [city, setCity] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const {t, i18n} = useTranslation();
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
    getIndustry();
  }, [selectedStateId]);

  const onSaveJob = async () => {
    let userId = await getStoreValue('userId');
    const requestBody = {
      title: workTitle,
      description: selectedWorkDescription,
      price: selectedSalary,
      locality: selectedArea,
      city: selectedCity,
      state: selectedState,
      no_of_labours: 1,
      type: workCategory,
      experience_required: Number(selectedWorkExperience),
      user_id: userId,
    };
    const res = await ContractorObj.saveJob(requestBody);

    if (res) {
      navigation.navigate('ContractorDashboard', {
        isJobCreated: true,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.LoginContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.loginFieldContainer}>
            <View style={styles.addJobHeader}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ContractorDashboard');
                }}>
                <View style={{marginTop: 30}}>
                  <BackArrowIcon />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {t('createJob')}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
              }}></View>
            <View>
              <Text style={styles.phoneNo}>
                {t('workTitle')} <Text style={styles.mandatoryText}>*</Text>
              </Text>
            </View>
            <View>
              <TextInput
                selectionColor={'#FEA700'}
                style={styles.phoneNoInput}
                onChangeText={(value: any) => {
                  setWorkTitle(value);
                }}></TextInput>
            </View>
            <View>
              <Text style={styles.phoneNo}>
                {t('workCategroy')} <Text style={styles.mandatoryText}>*</Text>
              </Text>
            </View>
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                dropdownPosition={'bottom'}
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
                  setWorkCategory(item.label);
                  setIsFocus(false);
                }}
              />
            </View>
            <View>
              <Text style={styles.phoneNo}>
                {t('workExperience')}
                <Text style={styles.mandatoryText}>*</Text>
              </Text>
            </View>
            <View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                dropdownPosition={'bottom'}
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
                  setSelectedWorkExperience(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <View>
              <Text style={styles.phoneNo}>
                {t('workDescription')}{' '}
                <Text style={styles.mandatoryText}>*</Text>
              </Text>
            </View>
            <View>
              <TextInput
                selectionColor={'#FEA700'}
                style={styles.phoneNoInput}
                onChangeText={(value: any) => {
                  setSelectedWorkDescription(value);
                }}></TextInput>
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
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
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
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSelectedCity(item.label);
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
                {t('workPrice')} <Text style={styles.mandatoryText}>*</Text>
              </Text>
            </View>
            <View>
              <TextInput
                onChangeText={(value: any) => {
                  setSelectedSalary(value);
                }}
                keyboardType={'number-pad'}
                selectionColor={'#FEA700'}
                style={styles.phoneNoInput}></TextInput>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              onSaveJob();
              navigation.navigate('Contractor');
            }}
            style={styles.sendOtpBtn}>
            <View>
              <Text style={styles.otpText}>{t('postAJob')}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
    marginBottom: 50,
  },
  addJobHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 'auto',
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
  ///

  AddWorkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
    backgroundColor: 'white',
  },
  InputWorkName: {
    display: 'flex',
    width: 300,
    height: 50,
    borderRadius: 5,
    borderColor: '#1a104c',
    borderWidth: 1,
    textAlign: 'center',
  },
  InputWorkDesc: {
    display: 'flex',
    width: 300,
    height: 200,
    borderRadius: 5,
    borderColor: '#1a104c',
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  InputWorkExperience: {
    display: 'flex',
    width: 300,
    height: 50,
    borderRadius: 5,
    borderColor: '#1a104c',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 10,
  },
  InputWorkPrice: {
    display: 'flex',
    width: 300,
    height: 50,
    borderRadius: 5,
    borderColor: '#1a104c',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 10,
  },
  LoginButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#1a104c',
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  LoginText: {
    color: 'white',
  },
  WorkImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
    marginBottom: 20,
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

export default AddWork;
