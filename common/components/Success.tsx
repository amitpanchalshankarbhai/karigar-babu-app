import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Success = (props: any) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
      }}>
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: 'white',
          borderRadius: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 3,
          marginTop: 6,
          marginBottom: 6,
          marginLeft: 16,
          marginRight: 16,
        }}>
        <View>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'cover',
            }}
            source={{
              uri: 'http://assets.datahayinfotech.com/assets/images/karigar_babu/ModalSuccess.gif',
            }}
          />
        </View>
        <View>
          <Text>Success</Text>
        </View>
        <View>
          <Text>{props.description}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FEA700',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 250,
              height: 45,
              borderRadius: 10,
            }}>
            <View>
              <Text style={{color: 'white'}}>Ok</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Success;
