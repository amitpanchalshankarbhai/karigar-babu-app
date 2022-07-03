import axios from 'axios';
import {BASE_URL} from '../URL';

let res: any;
export default class CommonApis {
  async getState() {
    try {
      await axios
        .get(`${BASE_URL}/api/statelist`)
        .then(response => {
          console.log('response', response);

          res = response;
        })
        .catch(error => {
          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async getCities(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/citieslist`, requestBody)
        .then(response => {
          console.log('response', response);
          res = response;
        })
        .catch(error => {
          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
}
