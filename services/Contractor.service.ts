import axios from 'axios';
import {BASE_URL} from '../URL';

let res: any;

export default class ContractorApi {
  async saveContractor(requestBody: any) {
    try {
      await axios
        .post(
          'http://apiproduct.datahayinfotech.com/api/users/create',
          requestBody,
        )
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
  async saveJob(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/work/create`, requestBody)
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
  async getLabourInfo(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/userdetails`, requestBody)
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
  async getApplicantData(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/applicants/details`, requestBody)
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
  async getCreatedWork(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/mywork`, requestBody)
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
  async getOnlineLabour(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/fetchonline/labor`, requestBody)
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
  async editUserProfile(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/user/update`, requestBody)
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
  async getFreeTrialCounter(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/trial/counter`, requestBody)
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
  async setOfflineStatus(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/labor/offline`, requestBody)
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
  async getWorkHistory(requestBody: any) {
    try {
      await axios
        .post(`${BASE_URL}/api/work/history`, requestBody)
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
