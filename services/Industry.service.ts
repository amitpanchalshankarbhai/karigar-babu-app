import axios from 'axios';
import {BASE_URL} from '../URL';

let res: any;
export default class IndustryApi {
  async getIndustry() {
    try {
      await axios
        .get(`${BASE_URL}/api/workslist`)
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
