import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import {
  BackArrowIcon,
  RightArrowIcon,
  Profile as ProfilePicture,
  ProfileNotification,
  ProfilePayment,
  ProfileHistory,
  ProfileAccountSecurity,
  ProfilePrivacyAndSecurity,
  HelpCenter,
} from '../common/icons';
import {getStoreValue} from '../common/LocalStorage';
import {ASSET_BASE_URL} from '../URL';

const Profile = ({navigation}: any) => {
  const [showEnabledHeart, setShowEnabledHeart] = useState(true);
  const [userType, setUserType] = useState<any>('');
  const [userProfile, setUserProfile] = useState<any>('');
  const [userInfo,setUserInfo] = useState<any>();
  useEffect(() => {
    const getUserType = async () => {
      const userType = await getStoreValue('userType');
      const userProfile = await getStoreValue('userProfile');
      const userInfo :any= await getStoreValue('userInfo');
      setUserInfo(JSON.parse(userInfo));
      setUserProfile(
        `https://assets.datahayinfotech.com/assets/storage/${userProfile}`,
      );
      setUserType(userType);
    };
   
    getUserType();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.DashboardContainer}>
        <View style={styles.DashboardMainContainer}>
          <View style={{width: '35%'}}>
            <TouchableOpacity
              onPress={() => {
                userType === 'contractor'
                  ? navigation.navigate('Contractor')
                  : navigation.navigate('Labour');
              }}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>
          <View style={{width: '60%'}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Profile</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfile');
          }}>
          <View style={styles.ProfileSection}>
            <View>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  marginLeft: 20,
                }}
                source={
                  // item.profile_pic
                  //   ? {uri: `${item.profile_pic}`}
                  // :
                  {
                    uri: userProfile,
                  }
                }
              />
            </View>
            <View>
              <View>
                <Text>{userInfo?.full_name}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#121212',
                  }}>
                  {userInfo?.industry}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <RightArrowIcon />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderWidth: 0.5,
            marginTop: 20,
            width: '100%',
            borderColor: '1px solid rgba(0, 0, 0, 0.1);',
          }}
        />
        {/* <View style={styles.ProfileSection}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <ProfileNotification />
          </View>
          <View style={{marginLeft: 20}}>
            <Text>Notification setting</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <RightArrowIcon />
        </View>
      </View> */}
        {/* <View style={styles.ProfileSection}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <ProfilePayment />
            </View>
            <View style={{marginLeft: 20}}>
              <Text>Payment</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <RightArrowIcon />
          </View>
        </View>
        <View style={styles.ProfileSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WorkHistory');
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <ProfileHistory />
              </View>
              <View style={{marginLeft: 20}}>
                <Text>Work History</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.ProfileSection}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <ProfileAccountSecurity />
          </View>
          <View style={{marginLeft: 20}}>
            <Text>Account security</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <RightArrowIcon />
        </View>
      </View>
      <View style={styles.ProfileSection}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <ProfilePrivacyAndSecurity />
          </View>
          <View style={{marginLeft: 20}}>
            <Text>Privacy security</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <RightArrowIcon />
        </View>
      </View> */}

        <View style={styles.ProfileSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FAQ');
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <HelpCenter />
              </View>
              <View style={{marginLeft: 20}}>
                <Text>Help Center</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DashboardContainer: {
    display: 'flex',
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
  ProfileSection: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  LabourList: {
    height: hp('10%'),
    width: wp('95%'),
    marginTop: 100,
  },
  item: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('10%'),
    padding: 20,
    marginBottom: 2,
    elevation: 2,
  },
  title: {
    fontSize: 32,
  },
  BasicInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  MainUserInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Profile: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  selectLabour: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.mainBlueColor.color,
  },
  SelectLabourText: {
    color: 'white',
  },
  JobDescription: {
    display: 'flex',
    padding: 10,
  },
  JobDescriptionText: {
    fontSize: 12,
  },
  ApplyButtonContainer: {
    marginLeft: 25,
  },
  UserProfile: {
    backgroundColor: 'white',
    display: 'flex',
    width: wp('100%'),
    height: hp('30%'),
    padding: 20,
    shadowColor: Colors.mainBlueColor.color,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    marginBottom: 5,
    elevation: 2,
  },
  UserProfileContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  emailId: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  phoneNo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  NotificationHeader: {
    marginLeft: 15,
  },
  SecoundRow: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default Profile;
