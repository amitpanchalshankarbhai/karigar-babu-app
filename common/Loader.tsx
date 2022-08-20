import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoaderImage from '../assets/loader.gif'
const Loader = () => {
  return (
    <View
      style={{
        height: hp('100%'),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: 'cover',
        }}
        source={LoaderImage}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
