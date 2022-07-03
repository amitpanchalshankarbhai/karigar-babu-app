import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {t} from 'i18next';
import {JobIcon, RightIcon, WatchJobIcon, WorkApplicant} from '../common/icons';
import {getStoreValue} from '../common/LocalStorage';
import ContractorApi from '../services/Contractor.service';
const ContractorObj = new ContractorApi();
const WorkHistoty = ({navigation}: any) => {
  const [work, setWork] = useState([]);
  useEffect(() => {
    const getCreatedWork = async () => {
      let userId = await getStoreValue('userId');
      let res = await ContractorObj.getWorkHistory({user_id: userId});
      if (res) {
        setWork(res.data.data);
      }
    };
    getCreatedWork();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            height: '100%',
            marginBottom: 100,
            elevation: 100,
            marginTop: 50,
          }}>
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
                    <View style={{marginLeft: 10}}>
                      <JobIcon />
                    </View>
                    <View style={{marginLeft: 10}}>
                      <View>
                        <Text>{item?.description}</Text>
                      </View>
                      <View style={{marginTop: 5}}>
                        <Text>
                          <WorkApplicant />
                          {'  '}
                          <Text style={{marginLeft: 20, color: '#1C3857'}}>
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
                      <Text style={{color: 'rgba(18, 18, 18, 0.35)'}}>
                        {Math.ceil(hours)} Hours ago
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 20,
                      }}>
                      <Text style={{color: '#FEA700'}}>{t('viewNow')}</Text>
                      <RightIcon />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  workCardContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  workTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
});

export default WorkHistoty;
