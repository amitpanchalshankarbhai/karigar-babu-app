import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Failure = (props: any) => {
  return (
    <View
      style={{
        width: 320,
        height: 320,
        backgroundColor: 'white',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        padding: 20,
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%',
          marginLeft: -10,
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={props.onCancel}>
          <AntDesign name="close" size={24} color="black" onPress={() => {}} />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
          }}
          source={{
            uri: 'http://assets.datahayinfotech.com/assets/images/karigar_babu/ModalFailure.gif',
          }}
        />
      </View>
      <View>
        <Text>Failure</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: '700', lineHeight: 23}}>
          {props.failureDescription}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={props.onCancel}
          style={{
            backgroundColor: '#FF1818',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 250,
            height: 45,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <View>
            <Text style={{color: 'white'}}>Ok</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Failure;
