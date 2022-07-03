import axios from 'axios';
import {BASE_URL} from '../URL';

let res: any;

export default class LabourApi {
  async saveContractor(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/users/create`, requestBody)
        .then(response => {
          console.log('response', response);

          res = response;
        })
        .catch(error => {
          console.log('error?.response?', error?.response);

          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async getLatestJobs(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/works`, requestBody)
        .then(response => {
          console.log('response', response);
          res = response;
        })
        .catch(error => {
          console.log('error?.response?', error?.response);
          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async getJobDetails(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/works`, requestBody)
        .then(response => {
          console.log('response', response);
          res = response;
        })
        .catch(error => {
          console.log('error?.response?', error?.response);
          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async getContractorDetails(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/contractor/details`, requestBody)
        .then(response => {
          console.log('response', response);

          res = response;
        })
        .catch(error => {
          console.log('error?.response?', error?.response);

          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async applyJob(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/work/apply`, requestBody)
        .then(response => {
          console.log('response', response);

          res = response;
        })
        .catch(error => {
          console.log('error?.response?', error?.response);

          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async becomeOnline(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/change/status`, requestBody)
        .then(response => {
          console.log('response', response);

          res = response;
        })
        .catch(error => {
          console.log('error?.response?', error?.response);

          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
  async getOnlineStatus(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/labor/status`, requestBody)
        .then(response => {
          console.log('response', response);
          res = response;
        })
        .catch(error => {
          console.log('error?.response?', error?.response);
          res = error?.response?.data;
        });
      return res;
    } catch (e) {
      return e;
    }
  }
}
