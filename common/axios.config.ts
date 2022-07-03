import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'http://apiproduct.datahayinfotech.com/';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value;
  } catch (e) {
    // error reading value
  }
};
axios.interceptors.request.use(
  async function (config: any) {
    let accessToken: any = await getData();
    // Do something before request is sent
    // const accessToken: any = localStorage.getItem('accessToken');
    const Authorization = 'Authorization';
    const Accept = 'Accept';
    const ContentType = 'Content-Type';

    if (accessToken && accessToken !== '') {
      config.headers[Authorization] = 'Bearer ' + accessToken;
    }
    config.headers[Accept] = 'application/json';
    config.headers[ContentType] = 'application/json';
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
