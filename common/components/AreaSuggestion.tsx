import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const API_KEY = 'AIzaSyBpo4YoLN5CWefZs8V_fWE_6uGftp-yY80';
interface IProps {
  setLocation: (value: any) => void;
  isNotSignup?: boolean;
}

interface IState {
  searchKeyword: any;
  searchResults: Array<string>;
  isShowingResults: Boolean;
  
}
export default class App extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false,
    };
  }

  searchLocation = async (text: any) => {
    this.setState({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${this.state.searchKeyword}`,
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.autocompleteContainer}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Search for an address"
              returnKeyType="search"
              style={this.props.isNotSignup ? styles.notSignupstyle : styles.searchBox}
              // placeholderTextColor="#000"
              onChangeText={text => this.searchLocation(text)}
              value={this.state.searchKeyword}
            />
            <EvilIcons
              style={{marginLeft: -20}}
              name="close"
              size={24}
              color="rgba(0, 0, 0, 0.4);"
              onPress={() => {
                this.setState({searchKeyword: ''});
              }}
            />
          </View>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {this.state.isShowingResults && (
              <View style={{overflow: 'scroll', height: 'auto'}}>
                {this.state.searchResults?.map((item: any) => {
                  return (
                    <View style={{overflow: 'scroll'}}>
                      <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => {
                          this.setState({
                            searchKeyword: item.description,
                            isShowingResults: false,
                          });
                          this.props.setLocation(item.description);
                        }}>
                        <Text>{item?.description}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
  },
  searchResultsContainer: {
    width: 250,
    height: 200,
    backgroundColor: '#fff',
    top: 50,
  },
  dummmy: {
    // width: 600,
    // height: 200,
    // backgroundColor: 'hotpink',
    // marginTop: 20,
  },
  resultItem: {
    width: '95%',
    justifyContent: 'center',
    height: 'auto',
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    borderBottomWidth: 1,
    marginLeft: 5,
    paddingLeft: 15,
    padding: 10,
  },
  searchBox: {
    width: 250,
    height: 40,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
  },
  notSignupstyle : {
    width: 290,
    height: 40,
    marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
  },
  container: {
    flex: 1,
    // backgroundColor: 'lightblue',
    alignItems: 'center',
  },
});
