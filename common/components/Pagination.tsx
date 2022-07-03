import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Pagination = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const returnPage = () => {
    let views = [];
    let j = 0;
    for (let i = 1; i < props.totalPages; i = i + 1) {
      views.push(
        <TouchableOpacity
          onPress={() => {
            setCurrentPage(i);
          }}>
          <View
            key={i}
            style={
              i == currentPage
                ? {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    width: 40,
                    borderWidth: 1,
                    borderColor: '#FEA700',
                    borderRadius: 10,
                    marginLeft: 10,
                    marginTop: 20,
                  }
                : {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    width: 40,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 10,
                    marginLeft: 10,
                    marginTop: 20,
                  }
            }>
            <Text>{j + 1}</Text>
          </View>
        </TouchableOpacity>,
      );
      j += 1;
    }
    return views;
  };
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {returnPage()}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
