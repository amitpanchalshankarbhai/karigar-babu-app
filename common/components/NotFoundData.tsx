import {View, Text, Image} from 'react-native';
import React from 'react';

const NotFoundData = (props: any) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Image
        style={{
          width: 200,
          height: 200,
          marginTop: 100,
          marginLeft: -20,
          resizeMode: 'cover',
        }}
        source={{
          uri: 'http://assets.datahayinfotech.com/assets/images/NotFoundData.webp',
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
        }}>
        {props.errorHeader}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 5,
          color: 'rgba(18, 18, 18, 0.65);',
        }}>
        {props.errorDescription}
      </Text>
    </View>
  );
};

export default NotFoundData;
