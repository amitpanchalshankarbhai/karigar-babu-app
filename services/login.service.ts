import axios from 'axios';
import {BASE_URL} from '../URL';

let res: any;
export default class LoginApi {
  async checkUser(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/mobileverify`, requestBody)
        .then(response => {
          res = response;
        })
        .catch(error => {
          console.log('error', error);

          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async verifyOtp(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/otpverify`, requestBody)
        .then(response => {
          res = response;
        })
        .catch(error => {
          console.log('error', error);

          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async googleLogin(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/login/google/callback`, requestBody)
        .then(response => {
          res = response;
        })
        .catch(error => {
          console.log('error', error);

          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
}
